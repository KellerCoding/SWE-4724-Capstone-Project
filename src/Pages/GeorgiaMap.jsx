import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./GeorgiaMap.css"

export default function GeorgiaMap () {
  const [selected, setSelected] = useState(null);

  const locations = [
    // { id: 1, name: "Location A", lat: 34.0522, lng: -118.2437 },
    // { id: 2, name: "Location B", lat: 40.7128, lng: -74.0060 },
    // { id: 3, name: "Location C", lat: 37.7749, lng: -122.4194 },
    { id: 1, name: "Kennestone Hospital", lat: 33.9690, lng: 264.5522 },
  ];


  return (
    <div>
      <h2>Interactive Locations Map</h2>
      <Map
        initialViewState={{
          latitude: 37.7749,
          longitude: -122.4194,
          zoom: 5
        }}
        style={{ width: "100%", height: "500px", borderRadius: "12px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      >
        {locations.map((loc) => (
          <Marker key={loc.id} latitude={loc.lat} longitude={loc.lng} onClick={() => setSelected(loc)}>
            📍
          </Marker>
        ))}

        {selected && (
          <Popup latitude={selected.lat} longitude={selected.lng} anchor="top" onClose={() => setSelected(null)}>
            <div>
              <h4>{selected.name}</h4>
              <p>Custom details here!</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}