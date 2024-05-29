import React from 'react';

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>{message}</p>
        <button onClick={onClose} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
      </div>
    </div>
  );
};

export default Modal;
