'use client';
import app_config from '@/config';
import axios from 'axios';
import { useParams } from 'next/navigation';
// 1. Import useCallback to memoize functions
import React, { useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

const Poll = () => {
  // 2. Initialize socket state to null. We'll create it in an effect.
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [roomdata, setRoomdata] = useState(null);
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState('Ask host to set question');

  // 3. Create the socket connection in a useEffect that runs only ONCE.
  useEffect(() => {
    const newSocket = io(app_config.api_url);
    setSocket(newSocket);

    // This is the cleanup function that runs when the component is unmounted.
    return () => {
      newSocket.disconnect();
    };
  }, []); // The empty array [] ensures this effect runs only once.

  // 4. Use useCallback to prevent getRoomData from being recreated on every render.
  // This makes it safe to use in the dependency array of another useEffect.
  const getRoomData = useCallback(async () => {
    if (!socket) return; // Don't run if the socket isn't ready.
    try {
      const res = await axios.get(app_config.api_url + '/room/getbyid/' + id);
      setRoomdata(res.data);
      socket.emit('join-room', res.data.title);
    } catch (error) {
      console.error("Failed to get room data:", error);
    }
  }, [socket, id]); // It will only recreate this function if `socket` or `id` changes.


  // 5. A separate useEffect to handle all socket event listeners.
  useEffect(() => {
    if (!socket) return; // Don't set up listeners until the socket is connected.

    getRoomData(); // Fetch initial data.
    console.log("connected", socket.id);

    // Define listener functions
    const onWelcome = (s) => console.log(s);
    const onRecieveMessage = (data) => console.log(data); // Note: your server-side logic seems to create an echo loop here.
    const onGetQuestion = (question) => setCurrentQuestion(question);

    // Set up listeners
    socket.on("welcome", onWelcome);
    socket.on("recieve-message", onRecieveMessage);
    socket.on('get-question', onGetQuestion);

    // 6. CRUCIAL: The cleanup function now removes all event listeners to prevent memory leaks.
    return () => {
      socket.off("welcome", onWelcome);
      socket.off("recieve-message", onRecieveMessage);
      socket.off('get-question', onGetQuestion);
    };

  }, [socket, getRoomData]); // 7. Correct dependency array. This effect re-runs if the socket or the getRoomData function changes.

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const submitPoll = () => {
    if (socket && roomdata) { // Add a check for roomdata
      socket.emit('submit-poll', { room: roomdata.title, poll: message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
      <div className='w-full max-w-7xl rounded-xl shadow-md px-3 py-2 mt-5 bg-gray-100 text-center text-2xl'> {currentQuestion} </div>
      <input value={message} onChange={e => setMessage(e.target.value)} className=" mt-5 mx-5 w-full border-2 px-3 py-2 rounded-full shadow-md " type="text" placeholder='Enter Your Response' />
      <br />
      <button onClick={submitPoll} type="submit" className='text-white ml-4 bg-blue-500 rounded-md mt-5 mb-5 p px-5 py-2 border-2 shadow-md'>Submit</button>
    </form>
  );
};

export default Poll;