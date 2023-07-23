import React from 'react';
import './Test.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  function clickOut(e){
    e.target.classList.contains('modal') && onClose();
  }
  return (
    <div className="modal" onClick={(e)=>clickOut(e)}>
      <div className="modal-content">
        {/* <button className="close-button" onClick={onClose}> */}
          {/* &times; */}
        {/* </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
