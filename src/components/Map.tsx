"use client";

import { Icon } from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import type {LatLngExpression} from 'leaflet'

type Props = {
  coordinates:{
    latitude:number;
    longitude:number;
  }
};

const Map = ({coordinates}: Props) => {

  const [mapCenter, setMapCenter] = useState<LatLngExpression>([coordinates.latitude, coordinates.longitude]);
  
  useEffect(() => {
    setMapCenter([coordinates.latitude, coordinates.longitude]);

  }, [coordinates]);

  const MapWrapper = () => {
    const map = useMap();

    useEffect(() => {
      map.flyTo([coordinates.latitude, coordinates.longitude])
    },[coordinates, map])

    return null;
  }

  const customIcon = new Icon({
    iconUrl:"https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize:[38,38]
  })

  return (
    <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={mapCenter} icon={customIcon}>
      </Marker>
      <MapWrapper/>
    </MapContainer>
  );
};

export default Map;
