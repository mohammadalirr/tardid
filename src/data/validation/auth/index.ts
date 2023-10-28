import * as yup from 'yup'

const store = yup
  .object({
    name: yup.string().required('name is required'),
    email: yup.string().email('invalid email').required('email is required'),
    password: yup.string().required('password is required'),
    repeatPassword: yup.string().required('password is required'),
    store: yup.object().required('name is required'),
  })
  .required()


const register = yup
  .object({
    name: yup.string().required('full name is required'),
    email: yup.string().email('invalid email').required('email is required'),
    password: yup.string().required('password is required'),
    repeatPassword: yup.string()
     .oneOf([yup.ref('password'), ''], 'passwords must match'),
    storeName: yup.string().required('store name is required'),
    displayName: yup.string().required('display name is required'),
    currency: yup.string().required('currency is required'),
    contactNumber: yup.string().required('contact number is required'),
    // logo: yup.mixed().required('logo is required'),
    address: yup.string().required('address is required'),
  })
  .required()


const login = yup
  .object({
    email: yup.string().email('invalid email').required('email is required'),
    password: yup.string().required('password is required'),
  })
  .required()

const authSchema = { login, register }

export default authSchema
