import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-blue-600 mb-4">
          Welcome to the Wellness Portal
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          It is not unusual for you to experience social, personal, or academic problems in your day-to-day life. The growing pressure to excel everywhere often leads to emotional or psychological turmoil, disturbing one’s peace of mind. At the Wellness Center of IITR, we offer a safe and supportive environment to discuss and address your challenges.
        </p>
      </header>

      {/* Appointment Booking Section */}
      <section className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-3/4 lg:w-1/2 mx-auto">
        <h2 className="text-3xl font-semibold text-blue-600 text-center mb-6">
          Book an Appointment with a Counselor
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Our counselors are here to listen, guide, and help you through any challenges. Don't hesitate to reach out to us. We are here for you!
        </p>

        {/* Booking Button */}
        <div className="flex justify-center">
          <Link
            to="/appo"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Wellness Portal of IITR</p>
        <p>All rights reserved © 2024</p>
      </footer>
    </div>
  );
};

export default Home;
