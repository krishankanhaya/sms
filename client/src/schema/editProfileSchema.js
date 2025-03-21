import * as yup from "yup";

const editProfileSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.date().required("Date of Birth is required"),
  branch: yup.string().required("Branch is required"),
  subject: yup.string().required("Subject is required"),
});

export default editProfileSchema;
