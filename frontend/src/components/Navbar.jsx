import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const userId = localStorage.getItem("user_id")
        setIsLoggedIn(!!userId)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user_id")
        setIsLoggedIn(false)
        setShowDropdown(false)
        alert("Logged out ✅")
        navigate('/login')
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 cursor-pointer'>
            <img onClick={() => navigate('/')} src={assets.logo} alt="" className='w-44 cursor-pointer' />

            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'><li className='py-1'>HOME</li></NavLink>
                <NavLink to='/doctors'><li className='py-1'>ALL DOCTORS</li></NavLink>
                <NavLink to='/about'><li className='py-1'>ABOUT</li></NavLink>
                <NavLink to='/contact'><li className='py-1'>CONTACT</li></NavLink>
            </ul>

            <div className='flex items-center'>
                {
                    isLoggedIn ? (
                        <div className='flex items-center cursor-pointer gap-2 relative'>
                            <div onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2">
                                <img src={assets.profile_pic} alt="" className='w-8 rounded-full' />
                                <img src={assets.dropdown_icon} alt="" className='w-2.5' />
                            </div>
                            {showDropdown && (
                                <div className='absolute top-12 right-0 text-base font-medium text-gray-600 z-50'>
                                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md'>
                                        <p onClick={() => {
                                            navigate('/my-profile')
                                            setShowDropdown(false)
                                        }} className='hover:text-black cursor-pointer'>My Profile</p>
                                        <p onClick={() => {
                                            navigate('/my-appointments')
                                            setShowDropdown(false)
                                        }} className='hover:text-black cursor-pointer'>My Appointments</p>
                                        <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => navigate('/login')} className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer'>
                            Create Account
                        </button>
                    )
                }

                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />

                {/* -----mobile menu----- */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 border-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className='flex items-center justify-between px-4 py-6'>
                        <img className='w-36' src={assets.logo} alt="" />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to={'/'}><p className='px-4 py-2 rounded inline-block'>HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to={'/doctors'}><p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to={'/about'}><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to={'/contact'}><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
