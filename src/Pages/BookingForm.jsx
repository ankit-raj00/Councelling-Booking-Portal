import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import service from '../Appwrite/config';  // Adjust the import as necessary

const BookingForm = () => {
  const { Enroll } = useParams();

  // Function to format the name from 'ankit-raj' to 'Ankit Raj'
  const formatName = (name) => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to extract the Councellor's name and Enroll number
  const extractNameAndEnroll = (param) => {
    const [name, enroll] = param.split('_');
    return { name: formatName(name), enroll };
  };

  // Extract Councellor name and Enroll number from URL
  const { name: counsellorName, enroll } = extractNameAndEnroll(Enroll);

  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    Enrollment_no: '',
    branchDept: '',
    Councellor: counsellorName, // Pre-filled Councellor name
    bookingDate: null,
    bookingTime: '',
    Enroll: enroll, // Pre-filled Enroll
  });

  // State to manage available slots and unavailable dates (leave periods)
  const [availableSlots, setAvailableSlots] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);

  // Fetch available slots and leave data
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await service.getSlotsByEnroll(enroll);
        if (response.error) {
          alert(response.error);
          return;
        }
        const slots = JSON.parse(response); // Parse available slots
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
        alert('Failed to fetch available slots. Please try again.');
      }
    };

    const fetchLeaveData = async () => {
      try {
        const leaveData = await service.getLeaveByEnroll(enroll);
        if (leaveData) {
          const leaves = JSON.parse(leaveData); // Parse leave data
          setUnavailableDates(leaves); // Store leave periods
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    fetchSlots();
    fetchLeaveData();
  }, [enroll]);

  // Function to check if the selected date is available based on leave
  const isDateAvailable = (date) => {
    if (!date) return false;
    const bookingDate = new Date(date);

    for (let i = 0; i < unavailableDates.length; i++) {
      const leaveStart = new Date(unavailableDates[i].start);
      const leaveEnd = new Date(unavailableDates[i].end);

      if (bookingDate >= leaveStart && bookingDate <= leaveEnd) {
        return false; // The date is within the leave period
      }
    }
    return true; // The date is not within the leave period
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      bookingDate: date,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.Enrollment_no || !formData.branchDept || !formData.bookingDate || !formData.bookingTime) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const combinedDateTime = `${formData.bookingDate.toISOString().split('T')[0]}T${formData.bookingTime}`;
      const enrollInt = parseInt(formData.Enroll, 10);

      if (isNaN(enrollInt)) {
        alert('Invalid Enroll number');
        return;
      }

      const response = await service.createBooking({
        Enrollment_no: parseInt(formData.Enrollment_no, 10),
        Name: formData.name,
        Branch_Dept: formData.branchDept,
        Councellor: formData.Councellor,
        Date_slot: combinedDateTime,
        Enroll: enrollInt,
      });

      console.log('Booking created successfully:', response);
      alert('Booking created successfully!');

      // Reset the form data after success
      setFormData({
        name: '',
        Enrollment_no: '',
        branchDept: '',
        Councellor: counsellorName,
        bookingDate: null,
        bookingTime: '',
        Enroll: enroll,
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  // Convert leave periods into disabled dates
  const getDisabledDates = () => {
    const disabledDates = [];
    unavailableDates.forEach((leave) => {
      const start = new Date(leave.start);
      const end = new Date(leave.end);

      // Add all days from start to end as disabled dates
      let currentDate = start;
      while (currentDate <= end) {
        disabledDates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1); // Increment to next day
      }
    });
    return disabledDates;
  };

  return (
    <div className="booking-form-container max-w-xs mx-auto p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Booking for: {counsellorName}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Enrollment Number */}
        <div>
          <label htmlFor="Enrollment_no" className="block text-sm font-medium text-gray-700">
            Enrollment No.
          </label>
          <input
            type="text"
            id="Enrollment_no"
            name="Enrollment_no"
            value={formData.Enrollment_no}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Branch/Department */}
        <div>
          <label htmlFor="branchDept" className="block text-sm font-medium text-gray-700">
            Branch/Department
          </label>
          <input
            type="text"
            id="branchDept"
            name="branchDept"
            value={formData.branchDept}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Councellor */}
        <div>
          <label htmlFor="Councellor" className="block text-sm font-medium text-gray-700">
            Councellor
          </label>
          <input
            type="text"
            id="Councellor"
            name="Councellor"
            value={formData.Councellor}
            onChange={handleChange}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Booking Date */}
        <div>
          <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700">
            Booking Date
          </label>
          <DatePicker
            selected={formData.bookingDate}
            onChange={handleDateChange}
            required
            minDate={new Date()} // Disallow past dates
            excludeDates={getDisabledDates().map(date => new Date(date))}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholderText="Select a date"
          />
        </div>

        {/* Booking Time */}
        <div>
          <label htmlFor="bookingTime" className="block text-sm font-medium text-gray-700">
            Booking Time
          </label>
          <select
            id="bookingTime"
            name="bookingTime"
            value={formData.bookingTime}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a time slot</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot.start}>
                {slot.start} - {slot.end}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!isDateAvailable(formData.bookingDate)} // Disable if date is unavailable
            className={`w-full ${isDateAvailable(formData.bookingDate) ? 'bg-black hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-600'} py-2 rounded-lg`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
