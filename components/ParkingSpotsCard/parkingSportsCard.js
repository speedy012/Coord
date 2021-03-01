import React from 'react'
import styles from './ParkingSpotsCard.module.css'

export default function ParkingSpotsCard(props) {

  const parkingUse = () => {
    return props.properties.uses.permitted.map((use, index) => {
      return <li key={index}>{use.use}</li>
    })
  }


  const distance = () => {
    let endDistance = props.properties.metadata.distance_end_meters
    let startDistance = props.properties.metadata.distance_start_meters

    let truckSize = endDistance - startDistance

    return truckSize.toFixed(2)
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={styles.ParkingSpotsCard} >
      <h3>Parking Type: {capitalizeFirstLetter(props.properties.uses.vehicle_type)} Vechiles</h3>
      <h4>Used For:</h4>
      <ul> {parkingUse()}</ul>
      <h4> Parking Spot Length: {distance()} meters</h4>
    </div>
  )
}
