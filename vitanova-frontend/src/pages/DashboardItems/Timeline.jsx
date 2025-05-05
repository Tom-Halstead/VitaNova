import React, { useEffect, useState } from "react";
import InteractiveChart from "../../components/InteractiveChart";
import { fetchSummary } from "../../api/dashboardApi";

export default function Timeline() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchSummary().then(setData);
  }, []);
  return <InteractiveChart data={data} />;
}
