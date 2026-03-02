"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="bg-off-white rounded-2xl shadow-lg p-6 max-w-md w-full mx-4 animate-modal-in">
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-lg font-bold text-heading">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded-lg text-warm-gray hover:bg-beige transition-colors"
            aria-label="閉じる"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
