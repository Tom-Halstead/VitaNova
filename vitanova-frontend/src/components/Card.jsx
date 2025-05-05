// src/components/Card.js
import React from "react";

export default function Card({ title, children, className = "" }) {
  return (
    <div className={`p-4 bg-white rounded shadow ${className}`}>
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="mt-1">{children}</div>
    </div>
  );
}
