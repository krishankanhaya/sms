import { useEffect, useState } from "react"
import { getProfile } from '../../services/common.js'
import UserLayout from "../../layouts/UserLayout.jsx"
import EditProfileModal from '../../components/common/EditProfileModal.jsx'
import APIClient from "../../helpers/api_helpers"
import * as url from "../../helpers/url_helpers.js"
import { formatDateToYYYYMMDD } from "../../services/utils.js"
import { useNavigate } from "react-router-dom"
const api = new APIClient()

const UserDashboard = () => {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfile()
        if (result.status == 404) navigate('/login')

        setProfileData(result.data.user)
      } catch (error) {
        console.log('Error during getting user profile.', error)
      }
    }

    fetchProfile()

  }, [])

  const handleSave = async (data) => {

    const formData = new FormData();
    if (data.profile[0]) {
      formData.append("profileImage", data.profile[0]);
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("dob", data.dob);
    formData.append("branch", data.branch);
    formData.append("subject", data.subject);

    try {
      const res = await api.post(url.UPDATE_PROFILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      console.log('update res', res)
      setProfileData(res.data.user);
      if (res.status !== 200) {
        navigate('/login')
      } else {
        alert(res.data.message)
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    try {

      let userPrompt = window.confirm('Are you sure want to delete your account?')
      if (!userPrompt) return;
      const res = await api.delete(url.DELETE_PROFILE)

      if (res.status === 200) {
        localStorage.removeItem('accessToken')
        alert(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      console.log('Error during deleting accoung.')
      window.alert('Error during deleting acccount.')
    }
  }

  if (!profileData) {
    navigate('/login')
  }

  return (
    <UserLayout profile={profileData}>
      <div className=" mt-8 w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <img
          src={'http://localhost:5000/media/' + profileData?.profile || "https://via.placeholder.com/150"}
          alt="User Profile image"
          className="m-auto mt-2 w-40 h-40 object-cover rounded-[50%]"
        />

        <div className="p-5 text-center">
          <div className="flex flex-col lg:flex-row justify-between">
            <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
            <div className="flex flex-col lg:flex-row gap-2">
              <button
                className="p-1 px-4 rounded bg-yellow-200 text-yellow-700 font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                Edit
              </button>
              <button onClick={handleDelete} className="p-1 px-4 rounded bg-red-200 text-red-700 font-bold">Delete</button>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-gray-700 text-left">
            <p><span className="font-semibold">Name:</span> {profileData?.name}</p>
            <p><span className="font-semibold">Email:</span> {profileData?.email}</p>
            <p><span className="font-semibold">Subject:</span> {profileData?.subject}</p>
            <p><span className="font-semibold">Branch:</span> {profileData?.branch}</p>
            <p><span className="font-semibold">DOB:</span> {formatDateToYYYYMMDD(profileData?.dob)}</p>
          </div>
        </div>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profileData={profileData}
        onSave={handleSave}
      />
    </UserLayout>
  )
}

export default UserDashboard
