'use client';
import app_config from '@/config';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const Poll = () => {


  const [socket, setSocket] = useState(io(app_config.api_url, { autoConnect: false }));

  const [message, setMessage] = useState("")
  const [roomdata, setRoomdata] = useState(null);

  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState('Ask host to set question');

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");

  };

  const getRoomData = async () => {
    const res = await axios.get(app_config.api_url + '/room/getbyid/' + id);
    console.log(res.data);

    setRoomdata(res.data);
    socket.emit('join-room', res.data.title)
  }

  useEffect(() => {
    socket.connect();
    getRoomData();
    console.log("connected", socket.id);

    socket.on("welcome", (s) => {
      console.log(s);

    });

    socket.on("recieve-message", (data) => {
      console.log(data);
      socket.emit("recieve-message", data)
    })

    socket.on('get-question', (question) => {
      setCurrentQuestion(question);
    })

    return () => {
      socket.disconnect();
    };

  }, []);

  const submitPoll = () => {
    socket.emit('submit-poll', { room: roomdata.title, poll :message });
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>

      <div className='w-full max-w-7xl rounded-xl shadow-md px-3 py-2 mt-5 bg-gray-100 text-center text-2xl'> {currentQuestion} </div>

      <input value={message} onChange={e => setMessage(e.target.value)} className=" mt-5 mx-5 w-full border-2 px-3 py-2 rounded-full shadow-md " type="text" placeholder='Enter Your Response' />

      <br />
      <button onClick={submitPoll} type="submit" className='text-white ml-4 bg-blue-500 rounded-md mt-5 mb-5 p  px-5 py-2 border-2 shadow-md'>Submit</button>

    </form>

  )
}

export default Poll;