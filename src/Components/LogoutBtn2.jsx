import React from 'react';
import { useDispatch } from 'react-redux';
import { logout2 } from '../Store/authslice';

function LogoutBtn2() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    // Clear local storage data
    localStorage.removeItem('Enroll');
    localStorage.removeItem('councellor_data');
    localStorage.removeItem('councellor_status');

    // Dispatch the logout action
    dispatch(logout2());
  };

  return (
    <button
      className='text-white inline-block px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600 hover:underline'
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn2;
