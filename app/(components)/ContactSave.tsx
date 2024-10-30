"use client";

import { useState } from "react";
import { BusinessCard } from "@/lib/types";

interface ContactSaveProps {
  card: BusinessCard;
}

export default function ContactSave({ card }: ContactSaveProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveContact = async () => {
    setIsSaving(true);

    if ("contacts" in navigator && "ContactsManager" in window) {
      try {
        const props = ["name", "email", "tel", "address"];
        const opts = { multiple: false };

        const contacts = await (navigator.contacts as any).select(props, opts);
        if (contacts.length > 0) {
          const contact = contacts[0];
          contact.name = [card.name];
          contact.email = [card.email];
          contact.tel = [card.phone];
          contact.address = [card.address];

          await (navigator.contacts as any).update(contacts);
          alert("Contact updated successfully!");
        } else {
          const newContact = {
            name: [card.name],
            email: [card.email],
            tel: [card.phone],
            address: [card.address],
          };
          await (navigator.contacts as any).insert([newContact]);
          alert("Contact saved successfully!");
        }
      } catch (error) {
        console.error("Error saving contact:", error);
        alert("Failed to save contact. Please try again.");
      }
    } else {
      alert(
        "Contact API is not supported in this browser. Unable to save contact."
      );
    }

    setIsSaving(false);
  };

  return (
    <button
      onClick={handleSaveContact}
      disabled={isSaving}
      className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
    >
      {isSaving ? "Saving..." : "Save Contact"}
    </button>
  );
}
