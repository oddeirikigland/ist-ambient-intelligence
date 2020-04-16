import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { nullableTypeAnnotation } from "@babel/types";

const styles = {
  height: "220px",
  width: "280px",
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
        style: "mapbox://styles/isollid/ck8zyxw490u6q1in1j1nktkyo",
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
