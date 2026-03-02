"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = "", id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-deep-navy">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`bg-beige/50 rounded-lg border border-transparent px-3 py-2 text-dark-text placeholder:text-warm-gray focus:border-muted-blue focus:outline-none transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
