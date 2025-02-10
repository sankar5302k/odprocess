"use client"

import { useState } from "react"
import OdStatusCheck from "./components/OdStatusCheck"
import OdAllotmentModal from "./components/OdAllotmentModel"
import OdWarningModal from "./components/OdWarningModal"
import OdCountTable from "./components/OdCountTable"

interface Student {
  sitId: string
  studentName: string // ✅ Add this field
  initialOd: number
}

export default function Home() {
  const [showAllotmentModal, setShowAllotmentModal] = useState(false)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null)

  const handleOdCheck = async (studentId: string) => {
    const response = await fetch(`/api/check-od?sitId=${studentId}`)
    const data: Student = await response.json()

    if (data.initialOd >= 5) {
      setShowWarningModal(true)
    } else {
      setCurrentStudent(data)
      setShowAllotmentModal(true)
    }
  }

  const handleOdAllotment = async (allot: boolean) => {
    if (allot && currentStudent) {
      await fetch("/api/allot-od", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sitId: currentStudent.sitId }),
      })
    }
    setShowAllotmentModal(false)
    setCurrentStudent(null)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">OD Management System</h1>
      <OdStatusCheck onCheck={handleOdCheck} />
      <OdCountTable />
      {showAllotmentModal && currentStudent && (
        <OdAllotmentModal
          student={currentStudent}
          onAllot={handleOdAllotment}
          onClose={() => setShowAllotmentModal(false)}
        />
      )}
      {showWarningModal && <OdWarningModal onClose={() => setShowWarningModal(false)} />}
    </div>
  )
}
