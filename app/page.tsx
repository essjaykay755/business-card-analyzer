"use client";

import { useState } from "react";
import CameraCapture from "./(components)/CameraCapture";
import HotelCard from "./(components)/BusinessCard/HotelCard";
import ProfessionalCard from "./(components)/BusinessCard/ProfessionalCard";
import { BusinessCard } from "@/lib/types";

export default function Home() {
  const [businessCard, setBusinessCard] = useState<BusinessCard | null>(null);

  const handleCapture = async (imageData: string) => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze business card");
      }

      const data = await response.json();
      setBusinessCard(data as BusinessCard);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze business card. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Business Card Analyzer</h1>
      {!businessCard && <CameraCapture onCapture={handleCapture} />}
      {businessCard &&
        (businessCard.category === "hotel" ? (
          <HotelCard card={businessCard} />
        ) : (
          <ProfessionalCard card={businessCard} />
        ))}
    </main>
  );
}
