import * as Yup from 'yup'

export const AddBookSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    isbn: Yup.number().min(13, "Minimum Length should must be 13").required('ISBN is required'),
    subject: Yup.string().required('Subject is required'),
    stock: Yup.number().required('Stock is required'),
    publishedOn: Yup.date().required('Published Date is Required'),
    price: Yup.number().required('Price is required'),
    selfNo: Yup.number().required('Self No is required'),
})

export const LoginSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(5).required('Password is required'),
})

export const SignupSchema = Yup.object({
    name: Yup.string().min(3).required('Name is required'),
    phone: Yup.string().min(10, "Minimum Length should must be 10").required('Phone is required'),
    email: Yup.string().email().required('Email is required'),
    role: Yup.string().min(3).required('Role is required'),
    password: Yup.string().min(5).required('Password is required'),
    password_repeat: Yup.string().min(5,"Minimum Length should must be 5").required('Password is required'),
})