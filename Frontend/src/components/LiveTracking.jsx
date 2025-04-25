import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const containerStyle = {
  width: '100%',
  height: '68%',
};

const fallbackCenter = { lat: 25.3176, lng: 82.9739 }; // Example: San Francisco

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(fallbackCenter);

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to fetch location. Using fallback location.');
      }
    );

    // Watch for location updates
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
      console.log('Updated Position:', { lat: latitude, lng: longitude });
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log('Position updated:', latitude, longitude);
        setCurrentPosition({ lat: latitude, lng: longitude });
      });
    };

    updatePosition(); // Initial position update

    const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MapContainer
      center={currentPosition}
      zoom={15}
      style={containerStyle}
    >
      <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
/>
      <Marker position={currentPosition} />
    </MapContainer>
  );
};

export default LiveTracking;