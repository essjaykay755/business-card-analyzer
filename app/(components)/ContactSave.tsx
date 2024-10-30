"use client";

import { useState } from "react";
import { BusinessCard } from "@/lib/types";

interface ContactsManager {
  select: (
    props: string[],
    options: { multiple: boolean }
  ) => Promise<Contact[]>;
  update: (contacts: Contact[]) => Promise<void>;
  insert: (contacts: Contact[]) => Promise<void>;
}

interface Contact {
  name: string[];
  email: string[];
  tel: string[];
  address: string[];
}

interface ExtendedNavigator extends Navigator {
  contacts?: ContactsManager;
}

interface ContactSaveProps {
  card: BusinessCard;
}

export default function ContactSave({ card }: ContactSaveProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveContact = async () => {
    setIsSaving(true);

    const navigator: ExtendedNavigator = window.navigator;

    if (navigator.contacts && "ContactsManager" in window) {
      try {
        const props = ["name", "email", "tel", "address"];
        const opts = { multiple: false };

        const contacts = await navigator.contacts.select(props, opts);
        if (contacts.length > 0) {
          const contact = contacts[0];
          contact.name = [card.name];
          contact.email = [card.email];
          contact.tel = [card.phone];
          contact.address = [card.address];

          await navigator.contacts.update(contacts);
          alert("Contact updated successfully!");
        } else {
          const newContact: Contact = {
            name: [card.name],
            email: [card.email],
            tel: [card.phone],
            address: [card.address],
          };
          await navigator.contacts.insert([newContact]);
          alert("Contact saved successfully!");
        }
      } catch (error) {
        console.error("Error saving contact:", error);
        alert("Failed to save contact. Please try again.");
      }
    } else {
      // Fallback to vCard download if Contacts API is not supported
      generateVCard();
    }

    setIsSaving(false);
  };

  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
ORG:${card.company}
TITLE:${card.title}
TEL:${card.phone}
EMAIL:${card.email}
ADR:;;${card.address}
URL:${card.website}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${card.name}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
