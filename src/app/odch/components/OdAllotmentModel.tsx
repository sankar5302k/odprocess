"use client";
import { useState } from "react";
interface Student {
    studentName: string
    initialOd: number
    id: number // Added id to match Students model
}

interface OdAllotmentModalProps {
    student: Student
    onAllot: (allot: boolean, reason?: string) => void
    onClose: () => void
}

export default function OdAllotmentModal({ student, onAllot, onClose }: OdAllotmentModalProps) {
    const [reason, setReason] = useState<string>('')

    const handleAllot = async (allotted: boolean) => {
        try {
            await fetch('/api/od-log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: student.id,
                    allotted,
                    reason: reason || undefined,
                }),
            });
            onAllot(allotted, reason);
        } catch (error) {
            console.error('Error logging OD allotment:', error);
            // Still call onAllot to maintain existing functionality
            onAllot(allotted, reason);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Allot OD for {student.studentName}?</h2>
                <p>Current OD count: {student.initialOd}</p>
                <div className="mt-4">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                        Reason for OD (optional)
                    </label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows={4}
                        placeholder="Enter reason for OD allotment (optional)"
                    />
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => handleAllot(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Allot OD
                    </button>
                    <button
                        onClick={() => handleAllot(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Don't Allot
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}