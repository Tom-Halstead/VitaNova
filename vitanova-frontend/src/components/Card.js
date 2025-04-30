import React from "react";

export default function Card({ title, className = "", children }) {
  return (
    <div className={`${className} p-6 bg-white rounded shadow`}>
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
      {children}
    </div>
  );
}
