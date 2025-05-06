import React, { useEffect, useState } from "react";
import InteractiveChart from "../../components/InteractiveChart";
import { fetchMoodTrend } from "../../api/DashboardApi";

export default function Trends() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchMoodTrend().then(setData);
  }, []);
  return <InteractiveChart data={data} />;
}
