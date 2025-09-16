'use client';
import app_config from '@/config';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState, useRef, useCallback } from 'react'; // Import useCallback
import QRCode from 'react-qr-code';
import { io } from 'socket.io-client';

// This component is now correctly named with an uppercase letter
const Host = () => {
    // 1. Initialize socket state to null. We'll create the instance in an effect.
    const [socket, setSocket] = useState(null);
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [submittedPolls, setSubmittedPolls] = useState([]);
    const inputRef = useRef(null);

    // 2. Create the socket connection in a useEffect that runs only ONCE.
    useEffect(() => {
        // Create a new socket instance
        const newSocket = io(app_config.api_url);
        setSocket(newSocket);

        // CRUCIAL: Cleanup function to disconnect the socket when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []); // Empty dependency array [] means this effect runs only once

    // 3. Memoize getRoomData with useCallback to prevent it from being recreated on every render.
    // This makes it safe to use in the useEffect dependency array.
    const getRoomData = useCallback(async () => {
        if (!socket) return; // Don't run if the socket isn't ready
        try {
            const res = await axios.get(app_config.api_url + '/room/getbyid/' + id);
            setRoomData(res.data);
            socket.emit('join-room', res.data.title);
        } catch (error) {
            console.error("Failed to get room data:", error);
        }
    }, [socket, id]); // This function will only be recreated if socket or id changes

    // 4. Handle all socket event listeners in a separate useEffect.
    useEffect(() => {
        if (!socket) return; // Don't set up listeners until the socket is ready

        // Initial data fetch
        getRoomData();

        const handleRecPoll = (poll) => {
            setSubmittedPolls((prevPolls) => [...prevPolls, poll]);
            console.log(poll);
        };

        socket.on('rec-poll', handleRecPoll);

        // CRUCIAL: The cleanup function removes the listener to prevent memory leaks.
        return () => {
            socket.off('rec-poll', handleRecPoll);
        };

    }, [socket, getRoomData]); // This effect runs when the socket is ready or getRoomData changes

    const setRoomQuestion = () => {
        if (socket && roomData && inputRef.current) {
            socket.emit('set-question', { room: roomData.title, question: inputRef.current.value });
        }
    };

    const formatWordData = () => {
        const words = {};
        submittedPolls.forEach(poll => {
            if (words[poll]) {
                words[poll] += 1;
            } else {
                words[poll] = 1;
            }
        });
        return Object.keys(words).map(word => ({ text: word, value: words[word] }));
    };
    
    // 5. Use window.location to create a dynamic URL for the QR code.
    // This will work on localhost, Render, or any other domain.
    const pollUrl = typeof window !== 'undefined' ? `${window.location.origin}/poll/${id}` : '';

    return (
        <div className='bg-neutral-950 p-6'>
            <div className='max-w-5xl h-full mx-auto bg-white rounded-3xl shadow-md shadow-white'>
                <div className='border shadow rounded-3xl'>
                    <div className='p-4 border-b-2'>
                        <input
                            ref={inputRef}
                            placeholder='Type Your Question'
                            type="text"
                            className='w-full p-3 bg-gray-300 rounded-xl outline-none' />
                        <button onClick={setRoomQuestion} className='border-none rounded-full px-3 py-2 bg-blue-500 text-white mt-3'>Submit</button>
                    </div>
                    {pollUrl && (
                        <div className='flex items-center'>
                            <p className='text-2xl font-semibold px-20'>Scan the Code to share your responses</p>
                            <QRCode value={pollUrl} className='my-5 h-40 border-b w-full pb-5' />
                        </div>
                    )}
                    <div className='p-6'>
                        {/* {submittedPolls.join(', ')} */}
                        {/* <ReactWordcloud words={formatWordData()} options={options} /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Host;