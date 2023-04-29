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
          // style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
          style: 'mapbox://styles/mapbox/streets-v12',
          center:[88.363881, 22.572672],
          zoom: 10,
      });
      map.on('load', async () => {
        if (pickupCoordinates) {
          addToMap(map, pickupCoordinates)
        }
    
        if (dropoffCoordinates) {
          addToMap(map, dropoffCoordinates)
        }
    
        if (pickupCoordinates && dropoffCoordinates) {

          try {
            // Get the route information using Mapbox Directions API
            const response = await fetch(
              `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
            );
            const data = await response.json();
            const route = data.routes[0].geometry;
  
            // Add the route as a source and layer on the map
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: route,
              },
            });
  
            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': 'orange',
                'line-width': 3,
              },
            });
  
            // Add markers for pickup and dropoff coordinates
            const pickupMarker = new mapboxgl.Marker().setLngLat(pickupCoordinates).addTo(map);
            const dropoffMarker = new mapboxgl.Marker().setLngLat(dropoffCoordinates).addTo(map);
  
            // Fit the map to the bounds of the route and markers
            const bounds = route.coordinates.reduce(
              (bounds, coord) => bounds.extend(coord),
              new mapboxgl.LngLatBounds().extend(pickupCoordinates).extend(dropoffCoordinates)
            );
            map.fitBounds(bounds, { padding: 100 });
          } catch (error) {
            console.error(error);
          }
          
          // addLineToMap(map,pickupCoordinates,dropoffCoordinates);

          // map.fitBounds([dropoffCoordinates, pickupCoordinates], {
          //   padding: 100,
          // })
        }
    });
  }, [pickupCoordinates, dropoffCoordinates])

    const addToMap = (map, coordinates) => 
    {
        const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
    }

  return <div className={style.wrapper}>Map</div>
}

export default Map
//