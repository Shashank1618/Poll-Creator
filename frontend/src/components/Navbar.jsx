'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

  const path = usePathname(); 

  return (
    <div>
        <nav className="border-gray-200 bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a
      href="/"
      className="flex items-center space-x-3"
    >
      <span className="self-center text-2xl font-semibold text-green-500">Gray<span className='self-center text-2xl font-semibold text-white'>Poll</span></span>
    </a>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
        <li>
          <Link
            className={"block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700 dark:text-white "+( path === '/' ? 'text-blue-700' : 'text-white')}
            href="/"
            aria-current="page"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/manage-room"
            className={"block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700 dark:text-white "+( path === '/manage-rooms' ? 'text-blue-700' : 'text-white')}
          >
            Rooms
          </Link>
        </li>
        <li>
          <Link
            href="/login"
            className={"block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700 dark:text-white "+( path === '/login' ? 'text-blue-700' : 'text-white')}
          >
            Login
          </Link>
        </li>
        <li>
          <a
            href="/contact"
            className={"block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-blue-700 dark:text-white "+( path === '/contact' ? 'text-blue-700' : 'text-white')}
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar