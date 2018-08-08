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
        currentPopup: [-70,5],
        i: '',
        query: ''
    }

    _updatePopup(current, index) {
        this.setState({currentPopup : current, i:index})
    }

    _closePopup() {
        this.setState({currentPopup: [-70,5]})
    }

    updateQuery = (query) => {
      this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    render() {
      const { center, zoom, arabica, fabbs,
        anıtkabir, tedu } = this.props
      const { currentPopup, i, query } = this.state

      const coordinates = [arabica,fabbs,anıtkabir,tedu]

      const locations = ['Arabica Coffee', 'Fabbs', 'Anıtkabir', 'TEDU']

      let showingLocations
      if(query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        showingLocations = locations.filter((location) => match.test(location))
      } else {
        showingLocations = locations
      }

      const phoneNumbers = ["(0312) 284 01 99", "(0312) 212 05 55", "(0312) 231 28 05", "(0312) 585 00 00"]
    
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
                        onClick={() => {this._updatePopup(coordinates[index], index)}}>
                            <div className='location-details'>
                                <p>{location} </p>
                                <p>Phone: {phoneNumbers[index]}</p>
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
                  <div>
                    <Marker
                      coordinates={coordinates[index]}
                      anchor= "bottom"
                      onClick={() => {this._updatePopup(coordinates[index], index)}}>
                    <MarkerIcon style={{fill: 'orange'}} />
                    </Marker>
                  </div>
              )
            }
            <Popup
              onClick={() => {this._closePopup()}}
              coordinates={currentPopup}
              style={{maxWidth: 200, color: '#4264FB'}}
              offset={{'bottom': [0, -38]}}>
                <h3>{locations[i]}</h3>
            </Popup>
            />
            <ZoomControl/>
          </Map>
        </div>
      );
    }
}

export default MyMap;