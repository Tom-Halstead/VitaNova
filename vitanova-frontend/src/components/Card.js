import React from "react";

export default function Card({ title, value }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <div className="mt-2">{value}</div>
    </div>
  );
}
