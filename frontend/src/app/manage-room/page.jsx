'use client'
import app_config from '@/config';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

const ManageRoom = () => {

  const [RoomList, setRoomList] = useState([]);

  // 1. Initialize currentUser state with null.
  const [currentUser, setCurrentUser] = useState(null);

  const inputRef = useRef(null);

  // 2. Use useEffect to safely access localStorage on the client-side.
  useEffect(() => {
    // This code only runs in the browser after the component has mounted.
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setCurrentUser(JSON.parse(userFromStorage));
    }
    // We can also fetch the data here, after we know we are on the client.
    fetchUsersData();
  }, []); // The empty array [] ensures this runs only once.


  const fetchUsersData = async () => {
    try {
      const res = await axios.get(app_config.api_url + '/room/getall');
      setRoomList(res.data);
    } catch (error) {
      console.error("Failed to fetch room data:", error);
      toast.error('Could not fetch rooms.');
    }
  }

  const deleteRoom = (index) => {
    const temp = [...RoomList];
    temp.splice(index, 1);
    setRoomList(temp);
  }

  const createNewRoom = () => {
    // 3. Add a check to ensure currentUser is loaded before trying to use it.
    if (!currentUser) {
      toast.error('You must be logged in to create a room.');
      return;
    }

    axios.post(app_config.api_url + '/room/add', { title: inputRef.current.value, owner: currentUser._id })
      .then((result) => {
        toast.success('Room created successfully!');
        fetchUsersData(); // Refresh the list
        if (inputRef.current) {
          inputRef.current.value = ''; // Clear the input field
        }
      }).catch((err) => {
        console.log(err);
        toast.error('Some error occurred.');
      });
  }

  return (
    <div className='max-w-5xl mx-auto mt-6'>
      <div className='border shadow rounded-xl'>
        <div className='p-4 border-b-2'>
          <input
            ref={inputRef}
            placeholder='Add a New Poll Room'
            type="text" className='w-full px-3 py-3 bg-gray-300 rounded-xl outline-none' />
          <button onClick={createNewRoom} className='border p-4 mt-3 rounded-full border-blue-600 text-white bg-blue-600 font-semibold text-sm'>Create New Room</button>
        </div>
        <div className='p-6'>
          {
            RoomList.map((room, i) => {
              return (
                <div key={room._id} className='rounded-md border mb-5 shadow p-4 bg-gray-100'>
                  <p>{room.title}</p>
                  <div className='mt-2 flex justify-end gap-4'>
                    <Link
                      href={'/host/' + room._id}
                      className='bg-blue-500 text-white px-2 py-1 font-semibold text-sm rounded-full hover:bg-blue-700'>
                      View Host
                    </Link>
                    <button
                      onClick={() => { deleteRoom(i) }}
                      className='bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600'>
                      Delete
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ManageRoom;