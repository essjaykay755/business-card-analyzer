"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface InteractiveMapProps {
  address: string;
}

export default function InteractiveMap({ address }: InteractiveMapProps) {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    const geocode = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setCoordinates(data.results[0].geometry.location);
        }
      } catch (error) {
        console.error("Error geocoding address:", error);
      }
    };

    geocode();
  }, [address]);

  if (!coordinates) {
    return <div>Loading map...</div>;
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "300px" }}
        center={coordinates}
        zoom={15}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
}
