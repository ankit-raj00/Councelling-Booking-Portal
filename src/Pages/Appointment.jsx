import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Container/Profile';
import service from '../Appwrite/config'; // Ensure the path to the service is correct
import { setAllCounsellors } from '../Store/authslice'; // Adjust the path to your Redux slice file

function Appointment() {
  const dispatch = useDispatch();
  const counsellors = useSelector((state) => state.auth.allcouncellor); // Access allcouncellor from Redux store

  useEffect(() => {
    // Fetch all counsellor data when the component mounts
    const fetchCounsellors = async () => {
      const response = await service.getAllCounsellors();
      if (response.error) {
        console.error(response.error);
      } else {
        dispatch(setAllCounsellors({ setCounsellors: response }));
        console.log("hii :" ,response) // Dispatch to update Redux store
      }
    };

    fetchCounsellors();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-semibold text-blue-600 mb-10">Counselor Profiles</h1>
      
      {/* Container for Profile Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {counsellors.length > 0 ? (
          counsellors.map((counsellor) => (
            <Profile 
              key={counsellor.Enroll}  // Use Enroll as the unique ID
              name={counsellor.Name}
              image={counsellor.Image}  // Use Image URL from the document
              description={counsellor.Discription}
              Enroll={counsellor.Enroll}  // Pass Enroll as a prop
            />
          ))
        ) : (
          <p className="text-xl text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Appointment;
