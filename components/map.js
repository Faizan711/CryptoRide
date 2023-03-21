import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { UberContext } from '../context/uberContext'
import { ApiError } from 'next/dist/server/api-utils'
const style = {
    wrapper: `flex-1 h-full w-full`
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export const Map = () => 
{
    const { pickupCoordinates, dropoffCoordinates} = useContext(UberContext)
    //console.log(pickupCoordinates, dropoffCoordinates)
    useEffect(() => { 
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center:[88.363881, 22.572672],
            zoom: 3,
        });
        if (pickupCoordinates) {
          addToMap(map, pickupCoordinates)
        }
    
        if (dropoffCoordinates) {
          addToMap(map, dropoffCoordinates)
        }
    
        if (pickupCoordinates && dropoffCoordinates) {
          map.fitBounds([dropoffCoordinates, pickupCoordinates], {
            padding: 100,
          })
        }
    }, [pickupCoordinates, dropoffCoordinates])

    const addToMap = (map, coordinates) => 
    {
        const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
    }

    


  return <div className={style.wrapper}>Map</div>
}

export default Map