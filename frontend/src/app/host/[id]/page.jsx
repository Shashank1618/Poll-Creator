'use client';
import app_config from '@/config';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import QRCode from 'react-qr-code';
{/* import ReactWordcloud from 'react-wordcloud'; */}
import { io } from 'socket.io-client';

 const words = [
{/*
    //     {
//         text: 'told',
//         value: 64,
//     },
//     {
//         text: 'mistake',
//         value: 11,
//     },
//     {
//         text: 'thought',
//         value: 16,
//     },
//     {
//         text: 'bad',
//         value: 17,
//     },
//     {
//         text: 'correct',
//         value: 10,
//     },
//     {
//         text: 'day',
//         value: 54,
//     },
//     {
//         text: 'prescription',
//         value: 12,
//     },


//]
*/}

const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [40, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 300
};

const Host = () => {

    const [socket, setSocket] = useState(io(app_config.api_url, { autoConnect: false }));
    const { id } = useParams();
    const [roomData, setRoomData] = useState(null);
    const [submittedPolls, setSubmittedPolls] = useState([]);

    const inputRef = useRef(null);

    const getRoomData = async () => {
        const res = await axios.get(app_config.api_url + '/room/getbyid/' + id);
        console.log(res.data);

        setRoomData(res.data);
        socket.emit('join-room', res.data.title)
    }

    socket.on('rec-poll', (poll) => {
        setSubmittedPolls([...submittedPolls, poll]);
        console.log(poll);
        // formatWordData();
    })

    useEffect(() => {
        socket.connect();
        getRoomData();
    }, [])

    const setRoomQuestion = () => {
        socket.emit('set-question', { room: roomData.title, question: inputRef.current.value });
    }

    const formatWordData = () => {
        const words = {};
        submittedPolls.forEach( poll => {
            if(poll in words){
                words[poll]+=1;
            }else{
                words[poll]=1;
            }
        } )

        // console.log(words);
        return Object.keys(words).map( word => ({text : word , value : words[word]}) )
    }

    return (
        <div className='bg-neutral-950 p-6'>
            
            <div className='max-w-5xl h-full mx-auto bg-white rounded-3xl shadow-md shadow-white' >
                <div className='border shadow rounded-3xl'>
                    <div className='p-4 border-b-2'>
                        <input
                            ref={inputRef}
                            placeholder='Type Your Question'
                            type="text"
                            className='w-full p-3 bg-gray-300 rounded-xl outline-none' />

                        <button onClick={setRoomQuestion} className='border-none rounded-full px-3 py-2 bg-blue-500 text-white mt-3'>Submit</button>
                        
                    </div>
                    <div className='flex items-center'>
                        <p className='text-2xl font-semibold px-20'>Scan the Code to share your responses</p>
                        <QRCode value={'http://192.168.18.15:3000/poll/'+id} className='my-5 h-40 border-b w-full pb-5' />
                    </div>
                    <div className='p-6'>
                        {/* {submittedPolls} */}
                        {/* <ReactWordcloud words={formatWordData()} options={options} /> */}
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Host;