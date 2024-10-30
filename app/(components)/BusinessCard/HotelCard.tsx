"use client";

import { BusinessCard } from "@/lib/types";
import InteractiveMap from "../InteractiveMap";
import ContactSave from "../ContactSave";

interface HotelCardProps {
  card: BusinessCard;
}

export default function HotelCard({ card }: HotelCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">{card.company}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
          <p>
            <a
              href={`tel:${card.phone}`}
              className="text-blue-500 hover:underline"
            >
              {card.phone}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${card.email}`}
              className="text-blue-500 hover:underline"
            >
              {card.email}
            </a>
          </p>
          <p>{card.address}</p>
          <p>
            <a
              href={card.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {card.website}
            </a>
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Location</h3>
          <InteractiveMap address={card.address} />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Local Trip Planner</h3>
        {/* Implement trip planner component here */}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Booking Availability</h3>
        {/* Implement booking availability component here */}
      </div>
      <ContactSave card={card} />
    </div>
  );
}
