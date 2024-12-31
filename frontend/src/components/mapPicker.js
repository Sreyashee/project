import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { FaLocationCrosshairs } from "react-icons/fa6";

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapPicker = ({ onLocationSelect, initialLocation }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [location, setLocation] = useState(initialLocation || { lat: -3.745, lng: -38.523 });
  const [markerPosition, setMarkerPosition] = useState(location);
  const [error, setError] = useState(null);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latLng.toJSON();
    setMarkerPosition({ lat, lng });
    onLocationSelect({ lat, lng });
  };

  const handleMarkerDragEnd = (e) => {
    const { latLng } = e;
    const newPos = latLng.toJSON();
    setMarkerPosition(newPos);
    onLocationSelect(newPos);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setMarkerPosition({ lat: latitude, lng: longitude });
        onLocationSelect({ lat: latitude, lng: longitude });
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
      setMarkerPosition(initialLocation);
    }
  }, [initialLocation]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker
          position={markerPosition}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
      <div className="map-actions">
        <button className="locate-me-btn" onClick={handleLocateMe}>
        <FaLocationCrosshairs color="black" style={{ marginRight: '10px' }} />
             Locate Me
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default MapPicker;
