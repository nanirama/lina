/**
 * UNUSED component
 * feel free to delete
 */
import React from "react";

export const CardLineItem: React.FC<{ label: string }> = ({
  label,
  children,
}) => (
  <div className="inline-flex flex-row mb-2">
    <div className="text-xs uppercase text-gray-400 font-semibold w-24">
      {label}
    </div>
    <div className="block text-xs align-text-top">{children}</div>
  </div>
);
