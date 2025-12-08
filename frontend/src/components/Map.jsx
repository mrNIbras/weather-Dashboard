import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const WeatherMap = ({ coords }) => {
  if (!coords) return null;

  const position = [coords.lat, coords.lon];

  return (
    <MapContainer center={position} zoom={10} style={{ height: '400px', width: '100%', borderRadius: '8px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      <Marker position={position} />
      <ChangeView center={position} zoom={10} />
    </MapContainer>
  );
};

export default WeatherMap;