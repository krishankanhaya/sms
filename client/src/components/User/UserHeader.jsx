import { useState, useEffect, useRef } from 'react'

// service
import { logout } from '../../services/authService.js'

// media
import LogoutIcon from '../../assets/images/logout.png'
import ProfileDemo from '../../assets/images/demo_profile.png'

const UserHeader = ({ profile }) => {
  const profileDialog = useRef(null)
  const [active, setActive] = useState(false)

  const handleClickOutside = (event) => {
    if (profileDialog.current && !profileDialog.current.contains(event.target)) {
      if (!active) {
        setActive(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="border px-2 h-[10vh] min-h-[60px] flex flex-row justify-between items-center overflow-hidden">
      <h1 className='text-xl font-bold'>Student Management System</h1>
      <div>
        <img ref={profileDialog} onClick={() => setActive(true)} src={`http://localhost:5000/media/${profile?.profile}`} alt='profile-image' width="40px" />
        {active &&
          <div ref={profileDialog} className='absolute bg-[white] py-2 top-[4.1rem] right-[0rem] border border-t-0 rounded-bl-lg w-[200px] '>
            <div className='hover:bg-[#ddd] flex w-full items-center justify-center gap-2'>
              <img src={LogoutIcon} width="20px" alt='logut-btn' />
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default UserHeader
