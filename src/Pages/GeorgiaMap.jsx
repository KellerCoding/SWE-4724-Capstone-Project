import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import georgiaGeoJson from "../data/georgia.json";
import testData from "../data/finalData.json";
import star from "../assets/Images/ratingStar.png";
import dullStar from "../assets/Images/ratingStarGrey.png";

import { useParams, Link } from "react-router-dom";

const DEFAULT_VIEW = {
  latitude: 32.1656,
  longitude: -82.9001,
  zoom: 6,
};
const HOSPITAL_ZOOM = 12;

export default function GeorgiaMap() {
  const { hospitalId } = useParams();
  const mapRef = useRef(null);
  const [search, setSearch] = useState("");
  // Set to hard crop mode (no mask)
  const maskMode = false;

  // Build locations from finalData; keep JSON insertion order
  const locations = useMemo(() => {
    return Object.entries(testData).map(([id, data]) => ({
      id: String(id),
      name: data.hospitalInfo.name,
      lat: data.hospitalInfo.lat,
      lng: data.hospitalInfo.lng,
      city: data.hospitalInfo.city,
      address: data.hospitalInfo.address,
      website: data.hospitalInfo.website,
      grade: data.finalScore?.Grade_Final ?? 0,
    }));
  }, []);

  const hospitalFromRoute = useMemo(() => {
    if (!hospitalId) return null;
    return locations.find((loc) => loc.id === String(hospitalId)) || null;
  }, [hospitalId, locations]);

  const [selected, setSelected] = useState(hospitalFromRoute);
  const [viewState, setViewState] = useState(() =>
    hospitalFromRoute
      ? {
          latitude: hospitalFromRoute.lat,
          longitude: hospitalFromRoute.lng,
          zoom: HOSPITAL_ZOOM,
        }
      : DEFAULT_VIEW
  );

  // Fly camera to hospital; sync selected + controlled viewState
  const focusHospital = useCallback((loc, event) => {
    event?.originalEvent?.stopPropagation?.();
    event?.stopPropagation?.();
    if (!loc) return;

    setSelected(loc);
    setViewState({
      latitude: loc.lat,
      longitude: loc.lng,
      zoom: HOSPITAL_ZOOM,
    });

    mapRef.current?.flyTo({
      center: [loc.lng, loc.lat],
      zoom: HOSPITAL_ZOOM,
      duration: 800,
    });
  }, []);

  // Honor /georgia-map/:hospitalId from Hospital Score "See on Map"
  useEffect(() => {
    if (!hospitalFromRoute) return;
    focusHospital(hospitalFromRoute);
  }, [hospitalFromRoute, focusHospital]);

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const flyToLocation = (loc, event) => {
    focusHospital(loc, event);
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
    <div>
      {/* Navigation Button */}
      <div className="navigation-buttons">
        <Link to="/scorecard">
          <button className="back-button">
            <h6>Back to Scorecard</h6>
          </button>
        </Link>
      </div>
      
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

      </div>

      {/* Map */}
      <div className="map-wrapper">
        <Map
          ref={mapRef}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          onLoad={() => {
            if (hospitalFromRoute) focusHospital(hospitalFromRoute);
          }}
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
          touchZoomRotate={true}
          touchPitch={true}
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
            onClick={(e) => flyToLocation(loc, e)}
            style={{ cursor: 'pointer' }}
          >
            <div
              onClick={(e) => flyToLocation(loc, e)}
              style={{
                fontSize: '30px',
                cursor: 'pointer',
                filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))',
                userSelect: 'none'
              }}
            >
              📍
            </div>
          </Marker>
        ))}

        {/* Popup */}
        {selected && (
          <Popup
            key={selected.id}
            latitude={selected.lat}
            longitude={selected.lng}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelected(null)}
          >
            <div>
              <h4>{selected.name}</h4>
              <p>{selected.city}</p>
              {selected.address && <p>{selected.address}</p>}
              <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ marginRight: "4px", fontSize: "14px", fontWeight: "bold" }}>Rating:</span>
                {Array.from({ length: 5 }, (_, i) => (
                  <img
                    key={i}
                    src={i < selected.grade ? star : dullStar}
                    alt={i < selected.grade ? "star" : "dull"}
                    style={{ width: "16px", height: "16px" }}
                  />
                ))}
                <span style={{ marginLeft: "4px", fontSize: "12px", color: "#666" }}>
                  ({selected.grade}/5)
                </span>
              </div>
            </div>
          </Popup>
        )}
        </Map>
      </div>
    </div>
    </div>
  );
}
