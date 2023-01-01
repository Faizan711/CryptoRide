import React, { useEffect } from 'react'
import { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const style = {
    wrapper: `flex-1 h-full w-full`
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

export const Map = () => {
    useEffect(() => { 
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center:[88.363881, 22.572672],
            zoom: 4,
        });
    }, [])
  return <div className={style.wrapper}>Map</div>
    }
