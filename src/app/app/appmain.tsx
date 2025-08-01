import { useState } from "react";
import "./style.css";
import OdCheck from "../app/Odcheck";
import { useRouter } from "next/navigation"; // Import Router

const Appmain: React.FC<{ username: string }> = ({ username }) => {
  const [showModal, setShowModal] = useState(false);
  const [showOdCheck, setShowOdCheck] = useState(false); // State for OD Check
  const [isMultiple, setIsMultiple] = useState(false);
  const [studentName, setStudentName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [odCount, setOdCount] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false); // Loading state for adding student
  const [isCheckingOD, setIsCheckingOD] = useState(false); // Loading state for checking OD
  const router = useRouter();

  const handleSingleSubmit = async () => {
    if (!studentName || !studentId ) {
      alert("Please fill all fields!");
      return;
    }

    setIsAddingStudent(true); // Start loading

    try {
      const response = await fetch("/api/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: studentName.trim(),
          id: studentId.trim(),
          odCount: parseInt(odCount.trim(), 10), // Ensure it's a number
          username,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (response.ok) {
        alert(data.message);
        setShowModal(false);
        setStudentName("");
        setStudentId("");
        setOdCount("");
      } else {
        alert(data.message || "Error adding student!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add student!");
    } finally {
      setIsAddingStudent(false); // Stop loading
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setStudentName("");
    setStudentId("");
    setOdCount("");
    setFile(null);
  };

  const handleCheckOD = () => {
    setIsCheckingOD(true); // Start loading
    router.push("/odch"); // Navigate to OD Check page
  };

  return (
    <>
      <div id="webcrumbs">
        <div className="w-full h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
          <div className="w-full max-w-[1024px] min-h-screen p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-xl mx-auto flex items-center justify-center">
            <div className="w-full">
              <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 transform hover:scale-[1.02] transition-transform duration-300">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                  <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary-600 hover:scale-110 transition-transform">
                    person
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                    User : {username}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Add Student Section */}
                <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 group hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary-600 group-hover:scale-110 transition-transform duration-300">
                      person_add
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-center">
                      Add New Student
                    </h3>
                    <button
                      onClick={() => setShowModal(true)}
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg sm:rounded-xl font-medium transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[0px] transition-all duration-300"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">add_circle</span>
                        <span className="text-sm sm:text-base">Add Student</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* OD Check Section */}
                <div className="bg-white rounded-lg sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 group hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col items-center gap-4 sm:gap-6">
                    <span className="material-symbols-outlined text-4xl sm:text-5xl text-primary-600 group-hover:scale-110 transition-transform duration-300">
                      fact_check
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-center">
                      OD Check
                    </h3>
                    <button
                      onClick={handleCheckOD}
                      disabled={isCheckingOD} // Disable button while loading
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg sm:rounded-xl font-medium transform hover:translate-y-[-2px] hover:shadow-lg active:translate-y-[0px] transition-all duration-300"
                    >
                      <div className="flex items-center justify-center gap-2">
                        {isCheckingOD ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <span className="material-symbols-outlined">check_circle</span>
                            <span className="text-sm sm:text-base">Check OD Status</span>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Conditionally Render OdCheck Component */}
              {showOdCheck && <OdCheck />}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-purple-500 p-6 rounded-lg shadow-lg w-96 relative">
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-gray-600 text-lg font-bold">
              ✖
            </button>
            <h3 className="text-lg font-semibold mb-4">Add Student</h3>
            <div>
              <label className="block mb-2">Student Name:</label>
              <input 
                type="text" 
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="border p-2 rounded-lg w-full mb-2" 
              />
              <label className="block mb-2">Student ID:</label>
              <input 
                type="text" 
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="border p-2 rounded-lg w-full mb-2" 
              />
              <label className="block mb-2">Initial OD Count:</label>
              <input 
                type="text" 
                value={odCount}
                onChange={(e) => setOdCount(e.target.value)}
                className="border p-2 rounded-lg w-full" 
              />
              <button 
                onClick={handleSingleSubmit} 
                disabled={isAddingStudent} // Disable button while loading
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
              >
                {isAddingStudent ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Appmain;
