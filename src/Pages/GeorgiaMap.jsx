import React, { useState, useEffect } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./GeorgiaMap.css";
import georgiaGeoJson from "../data/georgia.json";
import { useParams } from "react-router-dom";

export default function GeorgiaMap() {
  const { hospitalId } = useParams();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [viewState, setViewState] = useState({
    latitude: 32.1656,
    longitude: -82.9001,
    zoom: 6,
  });

  const [maskMode, setMaskMode] = useState(true); // toggle true = hole mask

  const locations = [
    { id: "1", name: "Emory Hospital", lat: 33.7914, lng: -84.3195 },
    { id: "2", name: "Piedmont Hospital", lat: 33.8089, lng: -84.3949 },
    { id: "3", name: "Kennestone Hospital", lat: 33.969, lng: -84.5522 },
    { id: "4", name: "Northside Hospital", lat: 33.90901, lng: -84.35394 },
  ];

  // Automatically fly to hospital if hospitalId is in the URL
  useEffect(() => {
    if (!hospitalId) return;
    const hospital = locations.find((loc) => loc.id === hospitalId);
    if (!hospital) return;

    setSelected(hospital);
    setViewState({
      latitude: hospital.lat,
      longitude: hospital.lng,
      zoom: 12,
    });
  }, [hospitalId]);

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const flyToLocation = (loc) => {
    setSelected(loc);
    setViewState({
      latitude: loc.lat,
      longitude: loc.lng,
      zoom: 12,
    });
  };

  // Create a “hole mask” GeoJSON combining world & Georgia
  const holeMaskGeoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-180, 90],
              [180, 90],
              [180, -90],
              [-180, -90],
              [-180, 90],
            ],
            ...georgiaGeoJson.geometry.coordinates,
          ],
        },
      },
    ],
  };

  return (
    <div className="map-container">
      {/* Sidebar */}
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search location..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="location-list">
          {filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className="location-item"
              onClick={() => flyToLocation(loc)}
            >
              {loc.name}
            </div>
          ))}
          {filteredLocations.length === 0 && (
            <p className="no-results">No matches found</p>
          )}
        </div>

        <div className="mode-toggle">
          <button
            onClick={() => setMaskMode(true)}
            className={maskMode ? "active" : ""}
          >
            Hole Mask
          </button>
          <button
            onClick={() => setMaskMode(false)}
            className={!maskMode ? "active" : ""}
          >
            Hard Crop
          </button>
        </div>
      </div>

      {/* Map */}
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        transitionDuration={800}
        transitionEasing={(t) => t * (2 - t)}
        style={{ width: "100%", height: "500px", borderRadius: "12px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        maxBounds={
          maskMode
            ? undefined
            : [
                [-85.6052, 30.5707], // SW
                [-80.8413, 35.0012], // NE
              ]
        }
      >
        {/* Georgia Boundary */}
        <Source id="georgia-boundary" type="geojson" data={georgiaGeoJson}>
          <Layer
            id="georgia-fill"
            type="fill"
            paint={{ "fill-opacity": 0.15 }}
          />
          <Layer
            id="georgia-outline"
            type="line"
            paint={{ "line-width": 2 }}
          />
        </Source>

        {/* Hole mask outside Georgia */}
        {maskMode && (
          <Source id="hole-mask" type="geojson" data={holeMaskGeoJson}>
            <Layer
              id="hole-fill"
              type="fill"
              paint={{
                "fill-color": "black",
                "fill-opacity": 0.7,
              }}
              layout={{ "fill-sort-key": 1 }}
            />
          </Source>
        )}

        {/* Markers */}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            latitude={loc.lat}
            longitude={loc.lng}
            onClick={() => flyToLocation(loc)}
          >
            📍
          </Marker>
        ))}

        {/* Popup */}
        {selected && (
          <Popup
            latitude={selected.lat}
            longitude={selected.lng}
            anchor="top"
            onClose={() => setSelected(null)}
          >
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
