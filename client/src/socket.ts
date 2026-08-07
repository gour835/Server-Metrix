import { io } from 'socket.io-client';

export const socket = io('http://127.0.0.1:8080');

socket.on('connect', () => {
    console.log('socket connected');
});
socket.on('test', () => {
    console.log('socket test');
});

socket.on('disconnect',()=>{
    console.log('socket dissconnected');
});

