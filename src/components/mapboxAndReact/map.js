import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { nullableTypeAnnotation } from "@babel/types";
import "./map.css";

const styles = {
  height: "200px",
  width: "250px",
  position: "absolute"
};

function Map() {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiaXNvbGxpZCIsImEiOiJjazd0MGc5c2cwamtoM2xuMWQwYzhpZ2x2In0.wwIcASVukG2sAQD9YUyIdg";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
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
