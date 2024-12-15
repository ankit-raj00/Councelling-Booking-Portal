import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Container from '../Container/Container'
import Logo from './Logo'
import LogoutBtn from './LogoutBtn'
import LogoutBtn2 from './LogoutBtn2'

function Header() {
  const navigate = useNavigate()
  console.log('new');

  const authStatus = useSelector((state) => state.auth.status)
  const authcounc = useSelector((state) => state.auth.councellor_status)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus && !authcounc },
    { name: 'Appointment', slug: '/appo', active: authStatus },
    { name: 'Teams', slug: '/teams', active: true },
    { name: 'About Us', slug: '/about-us', active: true },
    { name: 'Counsellor Login', slug: '/councellor/login', active: !authcounc },
    { name: 'Counsellor Dashboard', slug: '/councellor', active: authcounc },
    
  ]

  return (
    <header className='bg-gradient-to-r from-blue-500 to-indigo-600 py-4 shadow-lg'>
      <Container>
        <nav className='flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
            <h1 className='text-white text-xl font-semibold'>Wellness Center IIT Roorkee</h1>
          </div>
          <ul className='flex space-x-6'>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='text-white inline-block px-6 py-2 rounded-lg font-medium transition-colors duration-300 hover:bg-blue-100 hover:text-blue-600 hover:underline'
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && !authcounc && (
              <li>
                <LogoutBtn />
              </li>
            )}{!authStatus && authcounc && (
              <li>
                <LogoutBtn2 />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
