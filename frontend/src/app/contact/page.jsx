import React from 'react'
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Contact = () => {
  return (
    <div className='antialiased bg-neutral-950'>
      <div className='flex w-full min-h-screen justify-center items-center'>
        <div className='flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0 bg-cyan-700 w-full max-w-4xl p-8 rounded-xl shadow-lg text-white sm:p-12 overflow-hidden'>
          <div className='flex flex-col space-y-8 justify-between'>
            <div>
              <h1 className='font-bold text-4xl tracking-wide'>Contact Us</h1>
              <p className='pt-2 text-green-100 text-sm '>Have questions or need assistance? Our team is here to provide support, guidance, and answers. Reach out anytime!</p>
            </div>
            <div className='flex flex-col space-y-6'>
              <div className='inline-flex space-x-2 items-center'>
                <IoCall className='inline text-teal-300 text-xl' />
                <span>+91-9981241210</span>
              </div>
              <div className='inline-flex space-x-2 items-center'>
                <MdEmail className='inline text-teal-300 text-xl' />
                <span>contact@mail.com</span>
              </div>
              <div className='inline-flex space-x-2 items-center'>
                <FaLocationDot className='inline text-teal-300 text-xl' />
                <span>23 Aswald Street-231102</span>
              </div>
            </div>
            <div className='flex space-x-4 text-lg'>
              <a href="#"><FaFacebook /></a>
              <a href="#"><BsTwitterX /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagramSquare /></a>
            </div>
          </div>
          <div className='relative'>
            <div className='absolute z-0 w-40 h-40 bg-teal-400 rounded-full -left-28 -bottom-16'></div>
            <div className='absolute z-0 w-40 h-40 bg-teal-400 rounded-full -right-28 -top-28'></div>
            <div className='relative z-10 bg-white rounded-xl shadow-lg p-8 text-gray-600 md:w-80'>
              <form action="" className='flex flex-col space-y-4'>
                <div>
                  <label htmlFor="" className='text-sm'>Your Name</label>
                  <input type="text" placeholder='Your Name' className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-cyan-700' />
                </div>
                <div>
                  <label htmlFor="" className='text-sm'>Email Address</label>
                  <input type="email" placeholder='Email Address' className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-cyan-700' />
                  </div>
                  <div>
                  <label htmlFor="" className='text-sm'>Message</label>
                  <textarea type="text" placeholder='Message' rows={4} className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-cyan-700' />
                </div>
                <button className='inline-block self-end border-2 border-cyan-700 text-cyan-700 font-bold rounded-lg px-6 py-2 uppercase text-sm hover:bg-cyan-700 hover:text-white'>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact