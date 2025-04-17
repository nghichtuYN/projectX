"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Software Engineer", value: 35, color: "#2563eb" },
  { name: "Product Manager", value: 25, color: "#16a34a" },
  { name: "UX Designer", value: 20, color: "#eab308" },
  { name: "Data Analyst", value: 15, color: "#ef4444" },
  { name: "Marketing Specialist", value: 5, color: "#8b5cf6" },
]

export function TopPositions() {
  return (
    <div className="flex flex-col h-[350px]">
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-xs">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

