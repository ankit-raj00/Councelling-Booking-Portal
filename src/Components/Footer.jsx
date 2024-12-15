import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-gradient-to-r from-blue-300 to-blue-500 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap justify-between">
          {/* Left Side: Logo and Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-6 inline-flex items-center">
                <Logo width="120px" />
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  &copy; 2023 Wellness Council. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Timings and Emergency Contact */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="text-lg font-semibold mb-6 text-gray-700 uppercase">Timings</h3>
              <p className="text-base text-gray-700 mb-4">Monday - Saturday: 09:00 am – 09:00 pm</p>
              <p className="text-base text-gray-700">Emergency: Anytime (Online Counselling)</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="text-lg font-semibold mb-6 text-gray-700 uppercase">Contact Us</h3>
              <p className="text-base text-gray-700 mb-4">
                Across Chemistry Department, Old Hobbies Club, Indian Institute of Technology Roorkee, Roorkee, Uttrakhand, 247667
              </p>
              <p className="text-base text-gray-700">Ph: 01332-284372</p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="text-lg font-semibold mb-6 text-gray-700 uppercase">Follow Us</h3>
              <div className="flex space-x-4">
                <Link 
                  to="/" 
                  className="text-black hover:text-red-700 transition duration-300 ease-in-out"
                >
                  Facebook
                </Link>
                <Link 
                  to="/" 
                  className="text-black hover:text-red-700 transition duration-300 ease-in-out"
                >
                  Instagram
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
