import React from "react";
import { USER_CONFIG } from "../config";
import { useState } from "react";
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const notify = () => toast.success('Here is your toast.');

const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const { input_field_1, input_field_2, btn_field_1, p_field_1 } =
    USER_CONFIG.homePage.rooms.byIds;

    
  const onNewRoomClick = (event) => {
    event.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success('Room id is created successfully.')
  }

  const onGenerateClick = (event) => {
    if (!roomId) {
      toast.error("Room Id is required!");
    }
    if (!userName) {
      toast.error("User Name is required!");
    }
    if (roomId && userName) {
      navigate(`/editor/${roomId}`, {
        state: { userName },
      })
    }
    toast.success('You have successfully entered in room')
  }


  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-2 mb-5 bg-secondary rounded">
            <div className="card-body text-center bg-dark">
              <img
                className="img-fluid mx-auto d-block"
                src="/images/logo192.png"
                alt="logo of algo talk"
              />
              <div className="text-light mb-2">
                {USER_CONFIG.homePage.rooms.title}
              </div>
              <form className="form-group">
                <input
                  value={roomId}
                  type={input_field_1.text}
                  className="form-control mb-2"
                  placeholder={input_field_1.placeHolder}
                  onChange={(e) => setRoomId(e.target.value)}
                />
                <input
                  value={userName}
                  type={input_field_2.text}
                  className="form-control mb-2"
                  placeholder={input_field_2.placeHolder}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </form>
              <button className="btn btn-success btn-lg" onClick={onGenerateClick}>
                {btn_field_1.name}
              </button>
              <p className="mt-2 text-light">
                {p_field_1.text}{" "}
                <span className='text-success p-2'
                  onClick={onNewRoomClick}
                  style={{
                    cursor: 'pointer'
                  }}>New Room?</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
