"use client"

import { useState } from "react"

interface OdStatusCheckProps {
  onCheck: (studentId: string) => void
}

export default function OdStatusCheck({ onCheck }: OdStatusCheckProps) {
  const [studentId, setStudentId] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!studentId.trim()) return // Stop if input is empty
    onCheck(studentId)
  }

  return (
    <div className=" mt-[90px]">
    <div className="max-w-md mx-auto ">
      <form onSubmit={handleSubmit} className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">OD Status Check</h2>
        <div className="mb-4">
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter Student ID"
            className="w-full p-3 rounded-md border-2 border-purple-300 focus:border-purple-500 focus:outline-none transition duration-200 bg-white bg-opacity-90 placeholder-purple-400"
          />
        </div>
        <button
          type="submit"
          disabled={!studentId.trim()} // Disable button if empty
          className={`w-full font-bold py-3 px-4 rounded-md transition duration-200 transform ${
            studentId.trim()
              ? "bg-purple-900 hover:bg-purple-950 text-white hover:scale-105 focus:ring-2 focus:ring-purple-500"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Check OD Status
        </button>
      </form>
    </div>
    </div>
  )
}
