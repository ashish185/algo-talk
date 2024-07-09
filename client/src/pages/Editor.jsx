import React, { useState } from "react";
import Client from "./components/Client";

const data = [
  { socketId: 1, userName: "Kavi" },
  { socketId: 2, userName: "Ramesh" },
  { socketId: 3, userName: "Long Name Rameshsssssssss" },
  { socketId: 4, userName: "Ramesh" },
];

const Editor = () => {
  const [clientData, setClientData] = useState(data);
  return (
    <div className="container-fluid vh-100 text-light">
      <div className="row h-100">
        <section
          className="col-md-2 bg-dark text-light d-flex flex-column h-100"
          style={{ boxShadow: "2px 0px 4px rgba(0,0,0,0.1)" }}
        >
          Members
          <img
            src="/images/logo192.png"
            alt="logo"
            className="img-fluid mx-auto"
            style={{
              maxWidth: "150px",
            }}
          ></img>
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
        <section className="col-md-10 text-light d-flex flex-column h-100">
          Members
        </section>
      </div>
    </div>
  );
};

export default Editor;
