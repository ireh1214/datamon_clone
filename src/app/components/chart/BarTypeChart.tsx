"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
} from "recharts";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page H", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page I", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page J", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page K", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page L", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page M", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page N", uv: 3490, pv: 4300, amt: 2100 }, 
  { name: "Page O", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page P", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page Q", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page R", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page S", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page T", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page U", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page V", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page W", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page X", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page Y", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page Z", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page AA", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page AB", uv: 3490, pv: 4300, amt: 2100 }, 
  { name: "Page AC", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page AD", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page AE", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page AF", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page AG", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page AH", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page AR", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Page AJ", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page AK", uv: 3000, pv: 1398, amt: 2210 }, 
];

export default function Chart() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <BarChart
      width={1250}
      height={250}
      data={data}
      margin={{
        top: 36,
        right: 36,
        left: 36,
        bottom: 36,
      }}
    >
      <CartesianGrid strokeDasharray="1 3" />
      <XAxis        
      dataKey="name" 
        interval={0} 
        angle={-45} 
        textAnchor="end" 
      />
      <Tooltip />
      <Bar
        dataKey="uv"
        fill="#B3CDAD"
        //stroke="white"
        // activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
      <Bar
        dataKey="pv"
        fill="#FF5F5E"
        //stroke="purple"
        // activeBar={<Rectangle fill="gold" stroke="purple" />}
      />
    </BarChart>
  );
}
