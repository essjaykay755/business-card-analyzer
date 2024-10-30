"use client";

import { BusinessCard } from "@/lib/types";
import InteractiveMap from "../InteractiveMap";
import ContactSave from "../ContactSave";

interface ProfessionalCardProps {
  card: BusinessCard;
}

export default function ProfessionalCard({ card }: ProfessionalCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">{card.name}</h2>
      <p className="text-xl mb-4">
        {card.title} at {card.company}
      </p>
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
        <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
        {/* Implement business hours component here */}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
        {/* Implement appointment scheduling component here */}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Professional Credentials</h3>
        {/* Implement professional credentials component here */}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Service Areas</h3>
        {/* Implement service areas component here */}
      </div>
      <ContactSave card={card} />
    </div>
  );
}
