import React, { Component } from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import { ZoomControl, Popup, Marker } from "react-mapbox-gl";
import escapeRegExp from 'escape-string-regexp'
import MarkerIcon from './markers/MarkerIcon';
import '../App.css'

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiZ3Vsc2FoZyIsImEiOiJjams2eGVsNnIxdGQ5M3BuNXhzaXkzeGNjIn0.T_W701upxXuPA5oSsHJypA',
    minZoom: 8,
    doubleClickZoom: true,
    maxZoom: 18
  })

class MyMap extends Component {
    state = {
        center: [ 32.846944, 39.925054 ],
        currentPopup: [-70,5],
        i: '',
        query: ''
    }

    _updatePopup(current, index) {
        this.setState({currentPopup : current, i:index})
    }

    _closePopup() {
        this.setState({currentPopup: [-70,5]})
        this.setState({ center: [ 32.846944, 39.925054 ] })
    }

    updateQuery = (query) => {
      this.setState({ query: query.trim() })
      this._closePopup()
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    changeCenter = (current) => {
      this.setState({ center: current })
    }

    render() {
      const { zoom, arabica,
        anıtkabir, tedu } = this.props
      const { center, currentPopup, i, query } = this.state

      const coordinates = {
        "Arabica Coffee": arabica,
        "Anıtkabir": anıtkabir,
        "Tedu": tedu
      } 

      const locations = ['Arabica Coffee', 'Anıtkabir', 'TEDU']

      let showingLocations
      let coordinatesFiltered
      if(query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        showingLocations = locations.filter((location) => match.test(location))
        coordinatesFiltered = Object.keys(coordinates)
        .filter((location) => match.test(location))
        .reduce((obj, key) => {
          obj[key] = coordinates[key];
          return obj;
        }, {});
        console.log(coordinatesFiltered)
      } else {
        showingLocations = locations
        coordinatesFiltered = coordinates
      }


      const phoneNumbers = ["(0312) 284 01 99", "(0312) 231 28 05", "(0312) 585 00 00"]

      return (
        <div>
        <div className="list-view">
            <div className='list-locations'>
              <div className='list-locations-top'>
                <input
                  className='search-locations'
                  type='text'
                  placeholder='Search locations by its name'
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                  />
                </div>
                    {showingLocations.map((location, index) => (
                        <li className='location-list-item'
                            key={index}
                            onClick={() => {this._updatePopup(Object.values(coordinatesFiltered)[index], index)
                            this.changeCenter(Object.values(coordinatesFiltered)[index])}}>
                                <div className='location-details'>
                                    <p>{location} </p>
                                    <p><span className="blue-text">Phone:</span> {phoneNumbers[index]}</p>
                                </div>
                        </li>
                    ))}
            </div>
            </div>
          <Map
            // eslint-disable-next-line
            style="mapbox://styles/gulsahg/cjk6xey2zd5h02rnv9kslj2vm"
            containerStyle={{ width: '75vw', height: '85.2vh', float: 'right' }}
            center= {center}
            zoom= {zoom}>
            { showingLocations.map((place, index) =>
                  <div key={index}>
                    <Marker
                      coordinates={Object.values(coordinatesFiltered)[index]}
                      anchor= "bottom"
                      onClick={() => {this._updatePopup(Object.values(coordinatesFiltered)[index], index)}}>
                    <MarkerIcon style= {currentPopup === Object.values(coordinatesFiltered)[index] ? {fill:"#4264FB",  transform: "scale(1.2)"} : {fill: "orange"}}  />
                    </Marker>
                  </div>
              )
            }
            <Popup
              onClick={() => {this._closePopup()}}
              coordinates={currentPopup}
              style={{maxWidth: 200, color: '#4264FB'}}
              offset={{'bottom': [0, -38]}}>
                <h3>{showingLocations[i]}</h3>
            </Popup>
            />
            <ZoomControl/>
          </Map>
        </div>
      );
    }
}

export default MyMap;
