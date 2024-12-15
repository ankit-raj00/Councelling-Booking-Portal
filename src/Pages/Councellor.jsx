import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LogoutBtn2 from "../Components/LogoutBtn2";
import service from "../Appwrite/config";

function Councellor() {
  const counsellorFromState = useSelector((state) => state.auth.councellorData?.cd);
  const counsellor = counsellorFromState || JSON.parse(localStorage.getItem("councellor_data")) || {};

  const [rows, setRows] = useState([]);
  const [customSlots, setCustomSlots] = useState([]);
  const [customLeaves, setCustomLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startSlot, setStartSlot] = useState("");
  const [endSlot, setEndSlot] = useState("");
  const [startLeave, setStartLeave] = useState("");
  const [endLeave, setEndLeave] = useState("");

  useEffect(() => {
    const fetchRows = async () => {
      if (counsellor?.Enroll) {
        setLoading(true);
        const result = await service.getAllRowsByEnroll(counsellor.Enroll);
        if (result.error) {
          console.error(result.error);
        } else {
          setRows(result);
        }
        setLoading(false);
      }
    };

    fetchRows();
  }, [counsellor?.Enroll]);

  // Slot Management Functions
  const handleAddSlot = () => {
    if (startSlot && endSlot) {
      setCustomSlots((prevSlots) => [...prevSlots, { start: startSlot, end: endSlot }]);
      setStartSlot("");
      setEndSlot("");
    } else {
      alert("Both start and end times are required.");
    }
  };

  const handleRemoveSlot = (index) => {
    setCustomSlots((prevSlots) => prevSlots.filter((_, i) => i !== index));
  };

  const handleUpdateSlots = async () => {
    if (counsellor?.Enroll) {
      const result = await service.updateCounsellorSlot({
        Enroll: counsellor.Enroll,
        newSlots: customSlots.map((slot) => ({ start: slot.start, end: slot.end })),
      });

      if (result.error) {
        console.error(result.error);
        alert("Failed to update slots. Please try again.");
      } else {
        alert("Slots updated successfully! All previous slots have been replaced.");
      }
    } else {
      alert("Unable to find counsellor's enrollment data.");
    }
  };

  // Leave Management Functions
  const handleAddLeave = () => {
    if (startLeave && endLeave) {
      setCustomLeaves((prevLeaves) => [...prevLeaves, { start: startLeave, end: endLeave }]);
      setStartLeave("");
      setEndLeave("");
    } else {
      alert("Both start and end dates are required.");
    }
  };

  const handleRemoveLeave = (index) => {
    setCustomLeaves((prevLeaves) => prevLeaves.filter((_, i) => i !== index));
  };

  const handleUpdateLeaves = async () => {
    const enroll = Number(counsellor?.Enroll); // Convert explicitly to a number
    console.log('Converted Enroll:', enroll);
  
    if (!isNaN(enroll)) {
      try {
        // Prepare new leaves array as start and end dates
        const newLeaves = customLeaves.map((leave) => ({
          start: leave.start,
          end: leave.end,
        }));
  
        const result = await service.editLeaveByEnroll({
          enroll: enroll,
          newLeaves: newLeaves, // Pass as array
        });
  
        if (!result) {
          alert("No record found for the provided Enroll.");
        } else {
          alert("Leaves updated successfully! All previous leaves have been replaced.");
        }
      } catch (error) {
        console.error('Error in handleUpdateLeaves:', error);
        alert("Failed to update leaves. Please try again.");
      }
    } else {
      alert("Invalid Enroll number.");
    }
  };
  
  
  
  // Function to format date with AM/PM
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  if (!counsellor || Object.keys(counsellor).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-8 w-3/4">
        {/* Profile Section */}
        <div className="flex flex-row mb-8">
          {/* Profile Image */}
          <div className="flex-shrink-0 flex items-center justify-center w-1/3">
            <img
              src={counsellor.Image || "/placeholder-profile.png"}
              alt={`${counsellor.Name || "Counsellor"}'s Profile`}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-between w-2/3 px-6">
            <h2 className="text-2xl font-bold">{counsellor.Name || "Counsellor Name"}</h2>
            <p className="text-gray-600 mt-2">{counsellor.Discription || "No description available."}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700">Profile Details</h3>
              <ul className="mt-2 space-y-2 text-gray-800">
                <li>
                  <span className="font-medium">Enrollment:</span> {counsellor.Enroll || "N/A"}
                </li>
                <li>
                  <span className="font-medium">Email:</span> {counsellor.Email || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slot Management Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Available Slots</h3>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="time"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startSlot}
              onChange={(e) => setStartSlot(e.target.value)}
              placeholder="Start Time"
            />
            <input
              type="time"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endSlot}
              onChange={(e) => setEndSlot(e.target.value)}
              placeholder="End Time"
            />
            <button
              onClick={handleAddSlot}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            >
              Add Slot
            </button>
          </div>
          <ul className="space-y-2">
            {customSlots.map((slot, index) => (
              <li
                key={index}
                className="flex items-center justify-between border border-gray-300 rounded px-4 py-2"
              >
                <span>
                  {slot.start} - {slot.end}
                </span>
                <button
                  onClick={() => handleRemoveSlot(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              if (window.confirm("This will replace all existing slots. Proceed?")) {
                handleUpdateSlots();
              }
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            Update Slots
          </button>
        </div>

        {/* Leave Management Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Leaves</h3>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="date"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startLeave}
              onChange={(e) => setStartLeave(e.target.value)}
              placeholder="Start Leave"
            />
            <input
              type="date"
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endLeave}
              onChange={(e) => setEndLeave(e.target.value)}
              placeholder="End Leave"
            />
            <button
              onClick={handleAddLeave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
            >
              Add Leave
            </button>
          </div>
          <ul className="space-y-2">
            {customLeaves.map((leave, index) => (
              <li
                key={index}
                className="flex items-center justify-between border border-gray-300 rounded px-4 py-2"
              >
                <span>
                  {leave.start} - {leave.end}
                </span>
                <button
                  onClick={() => handleRemoveLeave(index)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              if (window.confirm("This will replace all existing leaves. Proceed?")) {
                handleUpdateLeaves();
              }
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            Update Leaves
          </button>
        </div>

        {/* Rows Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">All Bookings</h3>
          {loading ? (
            <p className="text-gray-600">Loading student data...</p>
          ) : rows.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 text-left">Enrollment</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Branch/Dept</th>
                  <th className="py-2 px-4 text-left">Date Slot</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="py-2 px-4">{row.Enrollment_no}</td>
                    <td className="py-2 px-4">{row.Name}</td>
                    <td className="py-2 px-4">{row.Branch_Dept}</td>
                    <td className="py-2 px-4">{formatDate(row.Date_slot)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No bookings found for this counsellor.</p>
          )}
        </div>

        {/* Logout Button */}
        
      </div>
    </div>
  );
}

export default Councellor;
