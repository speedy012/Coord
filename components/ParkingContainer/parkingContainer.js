import React, { useEffect, useState } from 'react'

import ParkingSpotsCard from '../ParkingSpotsCard/parkingSportsCard'
import styles from './ParkingContainer.module.css'

export default function Info(props) {
  const [parkingSpots, setParkingSpots] = useState([])




  useEffect(() => {


      fetch(`https://api.coord.co/v1/search/curbs/bylocation/time_rules?latitude=${props.coord.lat}&longitude=${props.coord.lng}&radius_km=0.05&primary_use=park&access_key=_4q3U98ZlESpBMzlXiKCOrIsOb8aQPTDXwcQTwyNpcc`)
    .then(res => res.json())
    .then(res => setParkingSpots(res.features))

    }, [])



  const parkingData = () => {
    if (parkingSpots.length > 0 ) {

      return parkingSpots.map((spots, index) => {
          return <ParkingSpotsCard key={index} {...spots}/>
      })

    } else {
      return (
        <div>
          <h2 className={styles.subtitle}> Currently No Available Parking At This Time</h2>

        </div>
      )
    }
  }

  return (
    <>
      <div>
        <h3 className={styles.title}>Available Parking Spaces Near You:</h3>
        <div className={styles.ParkingContainer}>
          {parkingData()}
        </div>
        <div className={styles.link}>
          <button onClick={props.startOver}>Click Here to Return to Homepage</button>
          </div>
      </div>
    </>
  )
}
