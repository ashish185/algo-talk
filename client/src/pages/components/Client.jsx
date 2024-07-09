import React from 'react';
import Avatar from "react-avatar";

const Client = ({userName}) => {
  return (
    <div className="d-flex align-items-center gap-1 mb-3">
      <Avatar name={userName} size={40} round="14px" />
      <span>{userName}</span>
    </div>
  );
}

export default Client