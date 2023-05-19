import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { withScriptjs, withGoogleMap } from 'react-google-maps';
import Map from './components/Map/Map';
import './App.css';
import Main from './components/Main/Main';
import Layout from './Layout';

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div className="App" style={{ width: '100%', height: 'auto' }}>
      {/* <div style={{ width: '100%', height: 'auto' }}> */}
      {/* <WrappedMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBKgQswA5n7qe6JFx9NXHhRK7LPvB1PHLY"
          loadingElement={<div style={{ height: `auto` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100vh` }} />}
        /> */}      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="map" element={
            <WrappedMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBKgQswA5n7qe6JFx9NXHhRK7LPvB1PHLY"
              loadingElement={<div style={{ height: `auto` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100vh` }} />}
            />
          } />
        </Route>
      </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;