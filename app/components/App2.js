import React from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import airportdata from '../airportdata.csv'
import csv2geojson from 'csv2geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoiYWtzaGF5Z3VwdGEiLCJhIjoiY2ppZWppZzZyMG14NjNzdDR4bXBqMXhiOCJ9._N3Z7gKSKYAq6mIPAZZzhg'

// Loads CSV file, converts to geojson and renders
class App2 extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         airportdata: airportdata
      }
   }

   componentDidMount() {
      const {airportdata} = this.state
      console.log('airports', airportdata)

      var map = new mapboxgl.Map({
         container: this.node,
         style: 'mapbox://styles/mapbox/streets-v8',
         center: [-89, 41],
         zoom: 3
      })

      csv2geojson.csv2geojson(airportdata, {}, function(err, data) {
            console.log(data)
            map.on('load', function () {
               map.addLayer({
                   'id': 'airports',
                   'type': 'symbol',
                   'source': {
                       'type': 'geojson',
                       'data': data
                   },
                   'layout': {
                       "icon-image": "marker-15"
                   },
                   'paint': {}
               })
        })
      })
   }

   componentWillUnmount() {
      this.map.remove()
   }

   render() {
      const style = {
         position: 'absolute',
         top: 0,
         bottom: 0,
         width: '100%'
      }
      return (
         <div
            ref={node => this.node = node}
            style={style}
         >
         </div>
      )
   }
}

export default App2
