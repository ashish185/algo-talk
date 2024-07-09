import React from "react";
import { USER_CONFIG } from "../config";

const HomePage = () => {
  const { input_field_1, input_field_2, btn_field_1, p_field_1 } =
    USER_CONFIG.homePage.rooms.byIds;
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
                  type={input_field_1.text}
                  className="form-control mb-2"
                  placeholder={input_field_1.placeHolder}
                />
                <input
                  type={input_field_2.text}
                  className="form-control mb-2"
                  placeholder={input_field_2.placeHolder}
                />
              </form>
              <button className="btn btn-success btn-lg">
                {btn_field_1.name}
              </button>
              <p className="mt-2 text-light">
                {p_field_1.text}{" "}
                <span className='text-success p-2' style={{
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
