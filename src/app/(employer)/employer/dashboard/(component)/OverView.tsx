"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan 1",
    applications: 12,
    interviews: 4,
  },
  {
    name: "Jan 5",
    applications: 18,
    interviews: 6,
  },
  {
    name: "Jan 10",
    applications: 24,
    interviews: 8,
  },
  {
    name: "Jan 15",
    applications: 27,
    interviews: 10,
  },
  {
    name: "Jan 20",
    applications: 32,
    interviews: 12,
  },
  {
    name: "Jan 25",
    applications: 38,
    interviews: 14,
  },
  {
    name: "Jan 30",
    applications: 42,
    interviews: 16,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="applications" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="interviews" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary/50" />
      </BarChart>
    </ResponsiveContainer>
  )
}

