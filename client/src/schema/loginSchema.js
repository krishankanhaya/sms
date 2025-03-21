import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string().required('Email field is required.').email('Invalid Email'),
  password: Yup.string().required('Password field is required.').min(4, 'Password is minimum of 4 character long.'),
})

export default loginSchema
