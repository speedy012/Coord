import React, { useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Head from 'next/head'
import Header from '../components/Header/header'
import ParkingContainer from '../components/ParkingContainer/parkingContainer'
import styles from '../styles/Home.module.css'

export default function Index() {
  const [value, setValue] = useState(null);
  const [coord, setCoord] = useState({lat: null, lng: null})
  const API_KEY = process.env.GOOGLE_MAP_KEY

  const getCoord = () => {
    if(value) {
      let addy = value.label.replace(/,/g,"")
      let lastIndex = addy.lastIndexOf(" ");
      addy = addy.substring(0, lastIndex);

      geocodeByAddress(addy)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>
        setCoord({...coord, lat:parseFloat(lat.toFixed(6)), lng:parseFloat(lng.toFixed(6))})
      )
    }
  }

  const startOver = () => {
    setValue(null);
    setCoord({ lat: null, lng: null });
  };

  return (
    <>
     <Header/>

      { coord.lat === null ?
      <>
        <h4 className={styles.command}>Please Enter Address</h4>
        <div className={styles.search}>
          <GooglePlacesAutocomplete
            apiKey={API_KEY}
            selectProps={{
              value,
              onChange: setValue,
            }}
          />

          {value ? getCoord() : ""}
        </div>
        </>
      :
      <ParkingContainer coord={coord} startOver={startOver} />
      }
    </>
  )
}




