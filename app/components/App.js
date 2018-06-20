import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import data from '../stations.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWtzaGF5Z3VwdGEiLCJhIjoiY2ppZWppZzZyMG14NjNzdDR4bXBqMXhiOCJ9._N3Z7gKSKYAq6mIPAZZzhg';

class App extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			data: data
		}
	}

	componentDidMount(){
		const {data} = this.state

		var map = new mapboxgl.Map({
		    container: this.node,
			 center: [-122.4206, 37.7725],
			 zoom: 1.8,
		    style: 'mapbox://styles/mapbox/streets-v9'
		})

		map.on('load', () => {
			map.addSource('airports', {
				type: 'geojson',
				data: data,
				cluster: true,
				clusterMaxZoom: 14,
				clusterRadius: 50
			})
			map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'airports',
          paint: {
              'circle-color': {
                  property: 'point_count',
                  type: 'interval',
                  stops: [
                      [0, '#41A337'],
                      [100, '#2D7026'],
                      [750, '#0B5703'],
                  ]
              },
              'circle-radius': {
                  property: 'point_count',
                  type: 'interval',
                  stops: [
                      [0, 20],
                      [100, 30],
                      [750, 40]
                  ]
              }
          }
         });

         map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'airports',
          filter: ['has', 'point_count'],
          layout: {
              'text-field': '{point_count}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12
          }
         });
			map.addLayer({
				id: 'airports',
				type: 'circle',
				source: 'airports',
				filter: ['!has', 'point_count'],
				paint: {
	           'circle-color': '#1EF008',
	           'circle-radius': 6,
	           'circle-stroke-width': 1,
	           'circle-stroke-color': '#fff'
	       	}
			})
		})
	}

	componentWillUnmount(){
		this.map.remove();
	}

	render () {
		const {data} = this.state
		console.log(data)
		const style = {
	      position: 'absolute',
	      top: 0,
	      bottom: 0,
	      width: '100%'
	    };
		return(
			<div ref={node => this.node = node} style={style}></div>
		)
	}
}

export default App;
