import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import registrationSchema from '../../schema/registrationSchema.js'
import axios from 'axios'

// component imports
import Input from '../../components/FormElements/Input.jsx'

const Registration = () => {

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(registrationSchema) })

  // form submission
  const onSubmit = async (data) => {
    const formData = new FormData()
    try {
      formData.append('profileImage', data.profile[0])
      formData.append('name', data.name)
      formData.append('subject', data.subject)
      formData.append('branch', data.branch)
      formData.append('dob', data.dob)
      formData.append('email', data.email)
      formData.append('password', data.password)

      const res = await axios.post('http://localhost:5000/api/v1/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      if (res.status === 200) {
        alert(res.data.message)
        navigate('/login')
      }
    } catch (error) {
      alert(error.resoponse.data.message)
    }
  }
  return (
    <div className="m-[2rem] border-4 border-yellow-400 flex flex-col justify-center items-center min-h-[90vh] bg-[#F7F3E3] rounded-[2rem]">
      <div className=" w-[100%] lg:w-[50%] m-auto p-2">
        <h3 className="text-xl font-semibold my-4">Registration Form</h3>
        <form className='flex flex-row flex-wrap' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="my-2 col-6 m-auto w-[80%] lg:w-[50%] px-2">
            <Input
              label="Name"
              name="name"
              type="text"
              register={register}
              placeholder="Your Name"
              errors={errors}
            />
          </div>
          <div className="my-2 col-6 m-auto w-[80%] lg:w-[50%] px-2">
            <Input
              label="Email"
              name="email"
              type="text"
              register={register}
              placeholder="Your Email"
              errors={errors}
            />
          </div>
          <div className="my-2 col-6 m-auto w-[80%] lg:w-[50%] px-2">
            <div className="flex flex-col">
              <label htmlFor={'dob'} className="text-left pl-1">
                D.O.B.
              </label>
              <input {...register('dob')} min="2000-01-01" max="2020-12-31" type='date' className='p-2 rounded outline-yellow-400' />
              {errors && errors.dob &&
                <span className="text-left text-sm text-red-400 my-[2px]">{errors?.dob?.message.slice(0, 40) + '...'}</span>
              }
            </div>
          </div>
          <div className="my-2 col-6 m-auto w-[80%] lg:w-[50%] px-2">
            <div className="flex flex-col">
              <label htmlFor={'branch'} className="text-left pl-1">
                Branch
              </label>
              <select {...register('branch')} className='p-2 bg-white rounded outline-yellow-400' >
                <option value={''} > Select Branch </option>
                <option value="CSE">CSE</option>
                <option value="ME">ME</option>
                <option value="ECE">ECE</option>
                <option value="AI">AI</option>
              </select>
              {errors && errors.branch &&
                <span className="text-left text-sm text-red-400 my-[2px]">{errors?.branch?.message}</span>
              }
            </div>
          </div>
          <div className="my-2 col-6 m-auto w-[80%] lg:w-[50%] px-2">
            <div className="flex flex-col">
              <label htmlFor={'subject'} className="text-left pl-1">
                Subject
              </label>
              <select {...register('subject')} className='p-2 bg-white rounded outline-yellow-400' >
                <option value={''} >Select Subject</option>
                <option value={'English'}>English</option>
                <option value={'Math'}>Math</option>
                <option value={'Science'}>Science</option>
              </select>
              {errors && errors.subject &&
                <span className="text-left text-sm text-red-400 my-[2px]">{errors?.subject?.message}</span>
              }
            </div>
          </div>
          <div className="my-2 col-6 m-auto w-[80%] lg:w-[50%] px-2">
            <Input
              name="password"
              label="Password"
              type="password"
              register={register}
              placeholder="Your password"
              errors={errors}
            />
          </div>
          <div className="my-2 col-6 m-auto w-[80%] lg:w-[50%] px-2">
            <Input
              label="Confirm Password"
              name="cnfPassword"
              type="password"
              register={register}
              placeholder="Confirm password"
              errors={errors}
            />
          </div>
          <div className="my-2 col-6 m-auto w-[80%] lg:w-[50%] px-2">
            <div className="flex flex-col">
              <label htmlFor={'profile'} className="text-left pl-1">
                Profile Photo
              </label>
              <input type='file' {...register('profile')} accept='image/png, image/jpeg, image/jpg' className='bg-white  p-2 rounded' />
              {errors && errors.profile &&
                <span className="text-left text-sm text-red-400 my-[2px]">{errors?.profile?.message}</span>
              }
            </div>
          </div>
          <button type="submit" className="mt-4 mx-auto w-[80%] lg:w-[100%] bg-green-300 w-full py-2 rounded-[6px] font-medium">Submit</button>
        </form>
        <div className="mt-6 underline text-yellow-600">
          <Link to='/login' >Are you already registered? Login</Link>
        </div>
      </div >
    </div >
  )
}

export default Registration
