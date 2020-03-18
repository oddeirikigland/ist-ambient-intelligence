import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { nullableTypeAnnotation } from "@babel/types";
import "./map.css";

const styles = {
  height: "216px",
  width: "300px",
  position: "absolute",
  display: "block"
};

function Map() {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/isollid/ck7tegpyv1b8h1iob8z6ipnom",
        center: [-9.137, 38.724],
        zoom: 11.5
      });
      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };
    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
}

export default Map;
