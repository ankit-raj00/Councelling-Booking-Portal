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
      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn2;
