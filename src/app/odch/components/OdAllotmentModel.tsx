interface Student {
    studentName: string
    initialOd: number
  }
  
  interface OdAllotmentModalProps {
    student: Student
    onAllot: (allot: boolean) => void
    onClose: () => void
  }
  
  export default function OdAllotmentModal({ student, onAllot, onClose }: OdAllotmentModalProps) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Allot OD for {student.studentName}?</h2>
          <p>Current OD count: {student.initialOd}</p>
          <div className="mt-4 flex justify-end">
            <button onClick={() => onAllot(true)} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Allot OD
            </button>
            <button onClick={() => onAllot(false)} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
              Don't Allot
            </button>
            <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }
  