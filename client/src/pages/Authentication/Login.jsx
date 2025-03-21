import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { jwtDecode } from 'jwt-decode'
import loginSchema from '../../schema/loginSchema.js'

// component imports
import Input from '../../components/FormElements/Input.jsx'

// services imports
import { login } from '../../services/authService.js'

const Login = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) })

  const onSubmit = async (data) => {
    try {
      const res = await login(data)
      const decodedToken = jwtDecode(res.data.accessToken)
      const role = decodedToken.role
      console.log('res login', res)
      if (res.status === 200)
        navigate(`/${role}/dashboard`)

    } catch (error) {
      console.log('lo ee', error)
      if (error)
        alert(error?.response?.data?.message)
    }
  }
  return (
    <div className="m-[2rem] border-4 border-yellow-400 flex flex-col justify-center items-center h-[90vh] bg-[#F7F3E3] rounded-[2rem]">
      <div className="lg:w-[30%] w-[100%] m-auto p-2">
        <h3 className="text-xl font-semibold my-4">Login Form</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <Input
              label="Email"
              name="email"
              type="text"
              register={register}
              placeholder="Enter your email id."
              errors={errors}
            />
          </div>
          <div className="my-2">
            <Input
              label="Password"
              name="password"
              type="password"
              register={register}
              placeholder="Enter your password."
              errors={errors}
            />
          </div>
          <button type="submit" className="mt-4 bg-green-300 w-full py-2 rounded-[6px] font-medium">Submit</button>
        </form>
        <div className="mt-6 underline text-yellow-600">
          <Link to='/registration' >Is this your first time ? Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
