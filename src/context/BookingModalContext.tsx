"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface BookingModalContextType {
  isOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openBookingModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <BookingModalContext.Provider value={{ isOpen, openBookingModal, closeBookingModal }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal(): BookingModalContextType {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}
