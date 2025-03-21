import * as Yup from 'yup'

const registrationSchema = Yup.object().shape({
  name: Yup.string().required("Name field is required.").min(3, 'Name should be 3 character logn.'),
  email: Yup.string().required('Email field is required.').email('Invalid Email'),
  branch: Yup.string().required("Branch field is required."),
  subject: Yup.string().required("Subject field is required."),
  profile: Yup.mixed()
    .test("fileType", " Select valid image. Only JPEG or PNG allowed.", (file) => {
      return file && ["image/jpeg", "image/png"].includes(file[0]?.type);
    })
    .required("Image is required"),
  dob: Yup.date().min('01-01-2020', 'D.O.B. shluld be letter then  01-01-2020').required('D.O.B. is required.'),
  password: Yup.string().required('Password field is required.').min(4, 'Password is minimum of 4 character long.'),
  cnfPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password should match.').required('Confirm Password field is requird.'),
})

export default registrationSchema
