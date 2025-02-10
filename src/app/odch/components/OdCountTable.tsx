"use client"

import { useState, useEffect } from "react"

export default function OdCountTable() {
  const [odCounts, setOdCounts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOdCounts()
  }, [])

  const fetchOdCounts = async () => {
    setLoading(true)
    const response = await fetch("/api/od-counts")
    const data = await response.json()
    setOdCounts(data)
    setLoading(false)
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">OD Count Summary</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">OD Count</th>
              <th className="border p-2">Number of Students</th>
            </tr>
          </thead>
          <tbody>
            {odCounts.map((count) => (
              <tr key={count.odCount}>
                <td className="border p-2">{count.odCount}</td>
                <td className="border p-2">{count.studentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-4">
        <button onClick={fetchOdCounts} className="bg-green-500 text-white px-4 py-2 rounded">
          Refresh OD Counts
        </button>
      </div>
    </div>
  )
}

