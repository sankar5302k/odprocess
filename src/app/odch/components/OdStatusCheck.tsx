"use client"

import { useState } from "react"

export default function OdStatusCheck({ onCheck }) {
  const [studentId, setStudentId] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onCheck(studentId)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          className="flex-grow mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Check OD Status
        </button>
      </div>
    </form>
  )
}

