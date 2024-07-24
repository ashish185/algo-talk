import React, { useEffect, useRef, useState } from "react";
import Client from "./components/Client";
import "codemirror/mode/javascript/javascript";
import Editor from "./components/Editor";
import { initSocket } from "../socket";
import { Navigate, useLocation, useParams } from "react-router-dom";
import CONSTATNS from "../constants";
import toast from 'react-hot-toast';

const data = [
  { socketId: 1, userName: "Kavi" },
  { socketId: 2, userName: "Ramesh" },
  { socketId: 3, userName: "Long Name Rameshsssssssss" },
  { socketId: 4, userName: "Ramesh" },
];

const EditorPage = () => {
  const socketRef = useRef();
  const [clientData, setClientData] = useState([]);
  const location = useLocation();
  console.log('location.state', location.state);
  if (!location.state) {
    console.log('location.state', location.state);
    window.location = '/'
  }
  const params = useParams();

  const handleError= ()=> {
    toast.error(CONSTATNS.SOCKET_CONNECTION_FAILED);
  }


  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleError(err))
      socketRef.current.on('connect_failed', (err) => handleError(err))
      socketRef.current.emit('join', {
        roomId: params?.roomId,
        userName: location?.state?.userName //it has been pushed to via naviagate
      })
      socketRef.current.on('joined', ({ clients, userName, socketId }) => {
        console.log('list of clients at UI', clients, userName, socketId);
        if(location?.state?.userName !== userName){
          toast.success(`New user:${userName} joined`)
        }
      });

      socketRef.current.on('disconnected', ({ socketId, userName }) => {
        toast.success(`${userName} left`)
        // setClientData((state) => {
        //   return state.filter(obj => obj.socketId !== socketId);
        // });
      });
    };
    init();
  }, [])

  return (
    <div className="container-fluid vh-100 text-light">
      <div className="row h-100">
        <section
          className="col-md-2 bg-dark text-light d-flex flex-column h-100"
          style={{ boxShadow: "2px 0px 4px rgba(0,0,0,0.1)" }}
        >
          <img
            src="/images/logo192.png"
            alt="logo"
            className="img-fluid mx-auto"
            style={{
              maxWidth: "150px",
            }}
            onClick={(e) => {
              e.preventDefault();
              console.log('Image clicked');
              window.location = '/';
              return <Navigate to='/'  replace={true}/>
            }}
          />
          <hr />
          <div>
            {clientData.map((obj) => {
              return <Client key={obj.socketId} userName={obj.userName} />;
            })}
          </div>
          <div className="mt-auto d-flex flex-column gap-2">
            <hr />
            {/* Margin top auto set's it at down */}
            <button className="btn btn-success">Copy Room Id</button>
            <button className="btn btn-danger">Leave room</button>
          </div>
        </section>
        <section className="col-10 col-md-10 text-light d-flex flex-column h-100">
          <Editor />
        </section>
      </div>
    </div>
  );
};

export default EditorPage;
