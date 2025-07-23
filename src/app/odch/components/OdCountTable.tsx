"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import LogsTable from "./logs-table"

interface OdCount {
  odCount: number
  studentCount: number
}

interface Student {
  sitId: string
  studentName: string
}

export default function OdCountTable() {
  const [odCounts, setOdCounts] = useState<OdCount[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])
  const [selectedOdCount, setSelectedOdCount] = useState<number | null>(null)

  useEffect(() => {
    fetchOdCounts()
  }, [])

  const fetchOdCounts = async () => {
    setLoading(true)
    const response = await fetch("/api/od-counts")
    const data: OdCount[] = await response.json()
    setOdCounts(data)
    setLoading(false)
  }

  const handleViewStudents = async (odCount: number) => {
    try {
      const response = await fetch(`/api/students-with-od?odCount=${odCount}`)
      const result = await response.json()
      
      if (!response.ok) {
        console.error("API error:", result)
        return
      }
  
      setSelectedStudents(result || [])
      setSelectedOdCount(odCount)
      setShowModal(true)
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }

  return (
    <div className="min-h-screen bg-purple-950 text-white p-4 sm:p-8 mt-[50px]">
      <h2 className="text-lg sm:text-2xl font-bold mb-6 text-center">OD Count Summary</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-300"></div>
        </div>
      ) : (
        <div className="bg-purple-800 bg-opacity-50 rounded-lg shadow-xl overflow-hidden backdrop-blur-sm">
          {/* ✅ Responsive Table Wrapper for Mobile Scrolling */}
          <div className="overflow-x-auto">
            <ScrollArea className="max-h-[calc(100vh-200px)] sm:max-h-[80vh]">
              <Table className="min-w-max w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-purple-300 text-sm sm:text-base">OD Count</TableHead>
                    <TableHead className="text-purple-300 text-sm sm:text-base">Students</TableHead>
                    <TableHead className="text-purple-300 text-sm sm:text-base">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {odCounts.map((count) => (
                    <TableRow key={count.odCount}>
                      <TableCell className="font-medium">{count.odCount}</TableCell>
                      <TableCell>{count.studentCount}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleViewStudents(count.odCount)}
                          variant="secondary"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* ✅ Centered Refresh Button */}
      <div className="mt-6 flex justify-center">
        <Button onClick={fetchOdCounts} variant="secondary">
          Refresh
        </Button>
      </div>
      <br>
      </br>
<LogsTable></LogsTable>
      {/* ✅ Responsive Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-purple-900 text-white max-w-lg sm:max-w-3xl max-h-[80vh] sm:max-h-[70vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Students with OD Count: {selectedOdCount}</DialogTitle>
          </DialogHeader>
          {/* ✅ Scrollable Table for Small Screens */}
          <ScrollArea className="mt-4 max-h-[60vh] sm:max-h-[50vh]">
            <div className="overflow-x-auto">
              <Table className="min-w-max w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-purple-300 text-sm sm:text-base">Student ID</TableHead>
                    <TableHead className="text-purple-300 text-sm sm:text-base">Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedStudents.map((student) => (
                    <TableRow key={student.sitId}>
                      <TableCell>{student.sitId}</TableCell>
                      <TableCell>{student.studentName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
