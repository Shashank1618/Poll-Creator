'use client'
import app_config from '@/config';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

const ManageRoom = () => {

  // const [count, setCount] = useState(0);
  const [RoomList, setRoomList] = useState([]);

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  const inputRef = useRef(null);


  const fetchUsersData = async () => {  //user async with the await keyword because it only works in async functions
    const res = await axios.get(app_config.api_url+'/room/getall');
    console.log(res.status);
    console.table(res.data);
    setRoomList(res.data)
  }

  useEffect(() => {
    fetchUsersData();
  }, []);

  const deleteRoom = (index) => {
    console.log(index);
    const temp = RoomList;
    temp.splice(index, 1)
    setRoomList([...temp])
  }

  const createNewRoom = () => {
    axios.post(app_config.api_url+'/room/add', { title: inputRef.current.value, owner: currentUser._id })
      .then((result) => {
        toast.success('room created');
        fetchUsersData();
      }).catch((err) => {
        console.log(err);
        toast.error('some error ocuured');
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

export default ManageRoom