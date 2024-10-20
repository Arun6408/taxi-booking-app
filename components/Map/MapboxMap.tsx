import {
  DirectionDataContext,
  DistanceDurationContext,
  FromAddCoordsContext,
  ToAddCoordsContext,
  UserLocationContext,
} from "@/context/Context";
import React, { useContext, useEffect, useRef } from "react";
import { Map } from "react-map-gl";
import Markers from "./Markers";
import MapBoxRoute from "./MapBoxRoute";
import { toast, ToastContainer } from "react-toastify";
import {motion} from 'framer-motion';

const MapboxMap = () => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { selectedFromCoordinates } = useContext(FromAddCoordsContext);
  const { selectedToCoordinates } = useContext(ToAddCoordsContext);
  const { distanceDuration, setDistanceDuration } = useContext(
    DistanceDurationContext
  );
  const { directionCoordinates, setDirectionCoordinates } =
    useContext(DirectionDataContext);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      function (error) {
        if (error.code === error.PERMISSION_DENIED) {
          toast.error("User denied the geolocation request.");
        } else {
          toast.error("An error occurred while fetching your location.");
        }
      }
    );
  };

  const mapref = useRef<any>(null);

  useEffect(() => {
    if (userLocation && mapref.current) {
      mapref.current?.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 15,
        duration: 5000,
      });
    }
  }, [userLocation]);

  useEffect(() => {
    if (selectedFromCoordinates && mapref.current) {
      mapref.current?.flyTo({
        center: [selectedFromCoordinates.lng, selectedFromCoordinates.lat],
        zoom: 15,
        duration: 5000,
      });
    }
  }, [selectedFromCoordinates]);

  useEffect(() => {
    if (selectedToCoordinates && mapref.current) {
      mapref.current?.flyTo({
        center: [selectedToCoordinates.lng, selectedToCoordinates.lat],
        zoom: 15,
        duration: 5000,
      });
    }
  }, [selectedToCoordinates]);

  useEffect(() => {
    if (selectedFromCoordinates && selectedToCoordinates && mapref.current) {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${selectedFromCoordinates.lng}%2C${selectedFromCoordinates.lat}%3B${selectedToCoordinates.lng}%2C${selectedToCoordinates.lat}?alternatives=true&annotations=distance%2Cduration&geometries=geojson&language=en&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setDirectionCoordinates(data.routes[0].geometry.coordinates);
          setDistanceDuration({
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedFromCoordinates, selectedToCoordinates]);

  return (
    <motion.div
      className="m-5 p-4 border border-gray-200 bg-gray-50 h-[85vh] rounded-lg flex flex-col relative shadow-lg"
      initial={{ opacity: 0, x: 55 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      <h2 className="font-semibold text-2xl mb-4">Map</h2>
      <div className="my-2 w-full border flex-grow h-[70vh] rounded-2xl overflow-hidden">
        <Map
          ref={mapref}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
          initialViewState={{
            longitude: userLocation?.lng || 77.241, // default red fort location
            latitude: userLocation?.lat || 28.6562, // default red fort location
            zoom: 14,
          }}
          style={{ width: "100%", height: "70vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Markers />
          {directionCoordinates && directionCoordinates.length > 0 && (
            <MapBoxRoute />
          )}
        </Map>
      </div>
      {distanceDuration?.distance && distanceDuration?.duration ? (
        <div className="absolute right-4 bottom-4 z-10 bg-yellow-400 flex justify-center items-center gap-2 p-4 shadow-md rounded-lg text-gray-800">
          <div className="text-md">
            <span className="font-semibold">Distance: </span>
            {(distanceDuration.distance / 1000).toFixed(2)}
            km
          </div>
          <div className="text-md ">
            <span className="font-semibold">Duration: </span>
            {(distanceDuration.duration / 60).toFixed(0)}
            min
          </div>
        </div>
      ) : null}
    </motion.div>
  );
};

export default MapboxMap;
