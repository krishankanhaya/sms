// Component
import UserHeader from '../components/User/UserHeader'
import UserFooter from '../components/User/UserFooter'

const UserLayout = ({ children, profile }) => {
  return (
    <>
      <UserHeader profile={profile} />
      <div className='flex'>
        {children}
      </div>
      <UserFooter />
    </>
  )
}

export default UserLayout
