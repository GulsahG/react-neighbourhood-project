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
        hasError: false,
        center: [ 32.846944, 39.925054 ],
        zoom: [11.5, 11.5],
        currentPopup: [-70,5],
        i: '',
        query: '',
        infoContent: ''
    }

    // updates the popup on focused location change with the wikipedia info
    _updatePopup(current, index, place) {
      this.setState({ currentPopup : current, i:index })
      this.wikipediaInfo(place)
    }

    // closes the popup on click 
    _closePopup() {
      this.setState({ currentPopup: [-70,5], center: [ 32.846944, 39.925054 ], zoom: [ 11.5, 11.5] })
    }
    
    // updates the query when input changes and closes the popup with it
    updateQuery = (query) => {
      this.setState({ query: query.trim() })
      this._closePopup()
    }

    clearQuery = () => {
      this.setState({ query: '' })
    }

    // changes the current center to the focused location if there's one
    changeCenter = (current) => {
      this.setState({ center: current, zoom: [ 12.5, 12.5 ] })
    }

    // updates the zoom to be less on smaller devices
    updateZoom() {
      window.innerWidth < 950 ?
      this.setState({ zoom: [10.5, 10.5] })
      : this.setState({ zoom: [11.5, 11.5] })
    }

    // fetching the wikipedia API to get info for locations
    wikipediaInfo = (location) => {
      let url = `https://tr.wikipedia.org/w/api.php?&origin=*&action=opensearch&format=json&limit=1&search=${location}`;
      fetch(url)
      .then(function(response) {
        return response.json()
      }).then( (data) => {
        data[2][0] !== undefined ?
        this.setState({
            infoContent: data[2][0]
        }) :
        this.setState({
          infoContent: "Location info cannot found, check Wikipedia for more..."
        })
      })
      .catch(err => {
        alert(err)
      })
    }

    // checks for errors and updates the state
    componentDidCatch(error, info) {
      this.setState({ hasError: true })
      console.log(error, info)
    }
    
    // invokes the updateZoom function on device resizing 
    componentDidMount() {
      this.updateZoom()
      window.addEventListener("resize", this.updateZoom.bind(this));
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

      // filters the locations and their coordinates depending on the input and creates new arrays
      // if the input is empty, the new arrays are set to the original ones
      let showingLocations
      let coordinatesFiltered
      if(query && query !== 's' && query !== 'se' && query !=='h' && query !== 'u'){
        const match = new RegExp(escapeRegExp(query), 'i')
        showingLocations = locations.filter((location) => match.test(location))
        coordinatesFiltered = Object.keys(coordinates)
        .filter((location) => match.test(location))
        .reduce((obj, key) => {
          obj[key] = coordinates[key]
          return obj
        }, {})
      } else {
        showingLocations = locations
        coordinatesFiltered = coordinates
      }

      // the list of phone numbers in the same order as locations array 
      const phoneNumbers = ["(0312) 284 01 99", "(0312) 231 28 05", "(0312) 585 00 00",
      "(0312) 305 50 00", "(0312) 219 01 10", "0537 930 10 96", "0553 050 06 45", "(0312) 541 12 12", "(0312) 458 89 00"]

      return (
        <div>
        <div className="list-view">
            <ol className='list-locations' aria-label='list-locations'>
              <div className='list-locations-top'>
                <input
                  tabIndex='5'
                  aria-label='Search locations'
                  role='search'
                  className='search-locations'
                  type='text'
                  placeholder='Search locations by its name'
                  value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
                  />
                </div>
                  {showingLocations.length > 0 ? 
                    showingLocations.map((location, index) => (
                        <li className='location-list-item'
                            tabIndex='0'
                            key={index}
                            onClick={() => {this._updatePopup(Object.values(coordinatesFiltered)[index], index, location)
                            this.changeCenter(Object.values(coordinatesFiltered)[index])}}>
                                <div className='location-details'>
                                    <p>{location} </p>
                                    <p><span className="blue-text">Phone:</span> {phoneNumbers[index]}</p>
                                </div>
                        </li>
                    ))
                    : 
                    <h2>No locations found that match selection criteria</h2>
                  }
            </ol>
            </div>
          {!this.state.hasError ?
          <div id="my-map" role="application">
          <Map
            // eslint-disable-next-line
            style="mapbox://styles/gulsahg/cjk6xey2zd5h02rnv9kslj2vm"
            containerStyle={{ width: '76vw', height: '86.6vh', float: 'right' }}
            center= {center}
            zoom= {zoom}
            className= "map">
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
              tabIndex='0'
              onClick={() => {this._closePopup()}}
              coordinates={currentPopup}
              style={{maxWidth: 200, color: '#4264FB'}}
              offset={{'bottom': [0, -38]}}>
                <h2>{showingLocations[i]}</h2>
                <p className="orange-text">{infoContent}</p>
            </Popup>
            />
            <ZoomControl/>
          </Map>
          </div>
          :
          <h1>Map couldn't load properly, something went wrong.</h1>
          }
        </div>
      );
    }
}

export default MyMap;
