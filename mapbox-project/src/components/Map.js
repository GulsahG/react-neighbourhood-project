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
        zoom: [11.5, 11.5],
        currentPopup: [-70,5],
        i: '',
        query: '',
        infoContent: ''
    }

    _updatePopup(current, index, place) {
        this.setState({ currentPopup : current, i:index })
        this.wikipediaInfo(place)
    }

    _closePopup() {
        this.setState({ currentPopup: [-70,5], center: [ 32.846944, 39.925054 ], zoom: [ 11.5, 11.5] })
    }
    
    updateQuery = (query) => {
      this.setState({ query: query.trim() })
      this._closePopup()
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    changeCenter = (current) => {
      this.setState({ center: current, zoom: [ 12.5, 12.5 ] })
    }

    // fetching the wikipedia API
    wikipediaInfo = (location) => {
      let url = `https://tr.wikipedia.org/w/api.php?&origin=*&action=opensearch&format=json&limit=1&search=${location}`;
      fetch(url)
      .then(function(response) {
        return response.json();
      }).then( (data) => {
        data[2][0] !== undefined ?
        this.setState({
            infoContent: data[2][0]
        }) :
        this.setState({
          infoContent: "Location cannot found, check wikipedia for more..."
        })
        console.log(this.state.infoContent)
      })
      .catch(err => {
        console.log(err)
      })
    } 

    render() {
      const { arabica,
        anıtkabir, tedu, hacettepe, timboo, muddy, club, ankamall, seğmenler } = this.props
      const { zoom, center, currentPopup, i, query, infoContent } = this.state

      const coordinates = {
        "Arabica Coffee": arabica,
        "Anıtkabir": anıtkabir,
        "TED University": tedu,
        "Hacettepe University": hacettepe,
        "Timboo Cafe": timboo,
        "The Muddy Waters": muddy,
        "6:45 Club": club,
        "Ankamall": ankamall,
        "Seğmenler Park": seğmenler
      } 

      const locations = ['Arabica Coffee House', 'Anıtkabir', 'TED University', 'Hacettepe University',
       'Timboo Cafe', "The Muddy Waters", "6:45 Club", "Ankamall", "Seğmenler Park"]

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
      } else {
        showingLocations = locations
        coordinatesFiltered = coordinates
      }


      const phoneNumbers = ["(0312) 284 01 99", "(0312) 231 28 05", "(0312) 585 00 00",
      "(0312) 305 50 00", "(0312) 219 01 10", "0537 930 10 96", "0553 050 06 45", "(0312) 541 12 12", "(0312) 458 89 00"]

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
                            onClick={() => {this._updatePopup(Object.values(coordinatesFiltered)[index], index, location)
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
            containerStyle={{ width: '76vw', height: '85.2vh', float: 'right' }}
            center= {center}
            zoom= {zoom}>
            { showingLocations.map((place, index) =>
                  <div key={index}>
                    <Marker
                      coordinates={Object.values(coordinatesFiltered)[index]}
                      anchor= "bottom"
                      onClick={() => {this._updatePopup(Object.values(coordinatesFiltered)[index], index, place)}}>
                      <MarkerIcon style= {currentPopup === Object.values(coordinatesFiltered)[index] ? 
                      {fill:"#4264FB",  transform: "scale(1.2)"} : {fill: "orange"}} 
                      />
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
                <p className="orange-text">{infoContent}</p>
            </Popup>
            />
            <ZoomControl/>
          </Map>
        </div>
      );
    }
}

export default MyMap;
