import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Component } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { UberContext } from "../context/uberContext";
import { ApiError } from "next/dist/server/api-utils";
const style = {
  wrapper: `flex-1 h-full w-full`,
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const Map = () => {
  const [directions, setDirections] = useState([]);
  const [currentLeg,setCurrentLeg] = useState(0);
  const [legs, setLegs] = useState([]);
  const {
    pickupCoordinates,
    dropoffCoordinates,
    setDriverCoordinates,
    driverCoordinates,
  } = useContext(UberContext);
  const [currentDirectionIndex, setCurrentDirectionIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentDirectionIndex === 0 && currentLeg == 1) {
      setDirections(legs[0].steps);
      setCurrentDirectionIndex(legs[0].steps.length - 1);
      setCurrentLeg(0);
    } else {
      setCurrentDirectionIndex(Math.max(0, currentDirectionIndex - 1));
    }
  };
  

  const handleNextClick = () => {
    const nextIndex = Math.min(directions.length - 1, currentDirectionIndex + 1);
    
    // Check if there are more legs in the `legs` array
    if (nextIndex === directions.length - 1 && currentLeg == 0) {
      setDirections(legs[1].steps);
      setCurrentLeg(1)
      setCurrentDirectionIndex(0);
    } else {
      setCurrentDirectionIndex(nextIndex);
    }
  };

  const currentDirection = directions[currentDirectionIndex] || {};

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDriverCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
      console.log(driverCoordinates);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      // style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      style: "mapbox://styles/mapbox/streets-v12",
      center: [88.363881, 22.572672],
      zoom: 10,
    });
    map.on("load", async () => {
      if (pickupCoordinates) {
        addToMap(map, pickupCoordinates);
      }

      if (dropoffCoordinates) {
        addToMap(map, dropoffCoordinates);
      }

      if (driverCoordinates && pickupCoordinates && dropoffCoordinates) {
        try {
          // Get the route information using Mapbox Directions API
          const response = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${driverCoordinates.longitude},${driverCoordinates.latitude};${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`
          );
          const data = await response.json();
          const route = data.routes[0].geometry;
          //TODO: Set ride status to ongoing when driver reaches pickup and also add directions for pickup to destination
          setLegs(data.routes[0].legs)
          setCurrentLeg(0)
          console.log(data.routes[0].legs)
          //This shows directions from current location to pickup point legs[0] , legs[1] for pickup to drop off
          setDirections(data.routes[0].legs[0].steps);
          // Add the route as a source and layer on the map
          map.addSource("route", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: route,
            },
          });

          map.addLayer({
            id: "route",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "orange",
              "line-width": 3,
            },
          });

          // Add markers for pickup and dropoff coordinates
          const pickupMarker = new mapboxgl.Marker()
            .setLngLat(pickupCoordinates)
            .addTo(map);
          const dropoffMarker = new mapboxgl.Marker()
            .setLngLat(dropoffCoordinates)
            .addTo(map);
          const driverStartmarker = new mapboxgl.Marker()
            .setLngLat([
              driverCoordinates.longitude,
              driverCoordinates.latitude,
            ])
            .addTo(map);

          // Fit the map to the bounds of the route and markers
          const bounds = route.coordinates.reduce(
            (bounds, coord) => bounds.extend(coord),
            new mapboxgl.LngLatBounds()
              .extend(pickupCoordinates)
              .extend(dropoffCoordinates)
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
  }, [pickupCoordinates, dropoffCoordinates]);

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
  };

  return (
    <div>
      <div className={style.wrapper}>Map</div>
      {directions.length > 0 && (
        <div className="text-lg fixed top-20 right-0 z-20">
          <h2>Directions:</h2>
          <p>
            {currentDirection.maneuver && currentDirection.maneuver.instruction}
          </p>
          <div>
            <button
              onClick={handlePrevClick}
              disabled = {currentDirectionIndex === 0 && currentLeg == 0}
            >
              Previous
            </button>
            <button
              onClick={handleNextClick}
              disabled={currentDirectionIndex === directions.length - 1 && currentLeg == 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
