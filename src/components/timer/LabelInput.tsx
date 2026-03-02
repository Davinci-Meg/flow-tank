"use client";

interface LabelInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function LabelInput({ value, onChange, disabled }: LabelInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder="作業内容を入力..."
      className="w-full max-w-[300px] rounded-lg border border-beige bg-beige/50 px-3 py-2 text-center text-sm text-dark-text placeholder:text-warm-gray focus:border-muted-blue focus:outline-none transition-colors disabled:opacity-50"
    />
  );
}
