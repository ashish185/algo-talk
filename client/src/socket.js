import { io } from 'socket.io-client';

export const initSocket= async ()=> {
    const options={
        'force new connection': true, //it does wait for older connection is closed before starting new.
        'reconnectionAttempt': 'infinity',
        'timeout': 10000,
        'transports': ['websocket']
    }
    console.log('process.env.REACT_APP_SERVER_URL', process.env.REACT_APP_SERVER_URL);
    return io(process.env.REACT_APP_SERVER_URL, options);
};