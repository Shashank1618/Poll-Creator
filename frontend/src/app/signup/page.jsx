'use client'
import React from 'react'
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import axios from 'axios';
import app_config from '@/config';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  email: Yup.string().email('Invalid email').required('required'),

  password: Yup.string().required('Password is Required')
    .matches(/[a-z]/, 'Lowercase letter Required')
    .matches(/[A-Z]/, 'Uppercase letter Required')
    .matches(/[0-9]/, 'Number Required')
    .matches(/[\W]/, 'Special Character Required'),

  confirmPassword: Yup.string().required('Confirm Password is Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),

});


const SignUp = () => {

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {

      axios.post(app_config.api_url + "/user/add", values)
        .then((response) => {
          console.log(response.status);
          resetForm();
          toast.success('User registered successfully');
        }).catch((err) => {
          console.log(err);
          console.log(err.respond?.data?.message);
          setSubmitting(false);
        });

    },
    validationSchema: SignupSchema
  });

  return (
    <div className='flex flex-col h-screen items-center justify-center w-full flex-1  text-center bg-neutral-950'>

      <div className='bg-white rounded-2xl shadow-2xl grid grid-cols-12 w-full sm:w-2/3 md:max-w-4xl min-h-[60%] max-h-fit'>

        <div className='w-full bg-gray-600 py-36 px-12 text-white rounded-tl-2xl rounded-bl-2xl hidden lg:flex flex-col items-center justify-center lg:col-span-6'>
          <h2 className='text-3xl font-bold mb-2'>Hello, Friend!</h2>
          <div className='border-2 w-10 border-white rounded-lg inline-block mb-2'></div>
          <p className='text-white'>If you already have an account then login here.</p>
          <a href="/login"><button className='border-2 border-white rounded-full px-12 py-2 inline-block mt-10 font-semibold hover:bg-white hover:text-gray-500'>Login</button></a>
        </div>

        <div className='p-5 col-span-12 lg:col-span-6 w-full'>
          <div className='text-right font-bold'>
            <span className='text-gray-500'>Gray</span>Poll
          </div>
          <div className='py-10'>
            <h2 className='text-3xl font-bold text-gray-500 mb-2'>Sign Up</h2>
            <div className='border-2 w-10 border-gray-500 rounded-lg inline-block mb-2'></div>
            <div className='flex justify-center my-2'>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 text-sm'><ImFacebook /></a>
              <a href="#"></a>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 text-sm'><FaLinkedinIn /></a>
              <a href="#"></a>
              <a href="#" className='border-2 border-gray-200 rounded-full p-3 mx-1 text-sm'><FaGoogle /></a>
              <a href="#"></a>
            </div>
            <p className='text-gray-400 my-3'>or create a new account</p>
            <form className='flex flex-col items-center' onSubmit={signupForm.handleSubmit} >

              <label htmlFor="name"><span className='text-sm ml-4 text-red-500'>{signupForm.touched.name && signupForm.errors.name}</span></label>
              <div className='bg-gray-100 w-64 max-w-[90%] p-2 flex items-center space-x-2'>
                <IoPersonSharp className='text-gray-400 text-sm' />
                <input
                  onChange={signupForm.handleChange} value={signupForm.values.name} id='name'
                  type="text" placeholder='Name'
                  className={'bg-gray-100 ml-2 outline-none flex-1 text-sm w-full ' + ((signupForm.touched.name && signupForm.errors.name) ? 'border-red-500' : '')} />
              </div>

              <label htmlFor="email"><span className='text-sm ml-4 text-red-500 '>{signupForm.touched.email && signupForm.errors.email}</span></label>
              <div className='bg-gray-100 w-64 max-w-[90%] p-2  flex items-center space-x-2'>
                <FaRegEnvelope className='text-gray-400' />
                <input
                  onChange={signupForm.handleChange} value={signupForm.values.email} id='email'
                  type="Email" placeholder='Email' className={'bg-gray-100 outline-none flex-1 text-sm w-full ' + ((signupForm.touched.email && signupForm.errors.email) ? 'border-red-500' : '')} />
              </div>

              <label htmlFor="password"><span className='text-sm ml-4 text-red-500'>{signupForm.touched.password && signupForm.errors.password}</span></label>
              <div className='bg-gray-100 w-64 max-w-[90%] p-2 flex items-center space-x-2'>
                <MdLockOutline className='text-gray-400' />
                <input
                  onChange={signupForm.handleChange} value={signupForm.values.password} id='password'
                  type="password" placeholder='Password' className={'bg-gray-100 outline-none flex-1 text-sm w-full ' + ((signupForm.touched.name && signupForm.errors.name) ? 'border-red-500' : '')} />
              </div>

              <label htmlFor="confirmPassword"><span className='text-sm ml-4 text-red-500'>{signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}</span></label>
              <div className='bg-gray-100 w-64 max-w-[90%] p-2 flex items-center space-x-2 '>
                <MdLockOutline className='text-gray-400' />
                <input
                  onChange={signupForm.handleChange} value={signupForm.values.confirmPassword} id='confirmPassword'
                  type="password" placeholder='Confirm Password' className={'bg-gray-100 outline-none flex-1 text-sm w-full ' + ((signupForm.touched.name && signupForm.errors.name) ? 'border-red-500' : '')} />
              </div>
              <button type='submit' disabled={signupForm.isSubmitting} className='border-2 border-gray-600 text-gray-600 rounded-full px-12 py-2 inline-block mt-10 font-semibold hover:bg-gray-600 hover:text-white disabled:opacity-50'>
                <span>{signupForm.isSubmitting ? 'Please Wait' : 'Submit'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp