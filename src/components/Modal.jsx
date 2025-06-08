// src/components/Modal.jsx
import React from "react";

function Modal({ visible, message, onClose }) {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-6 max-w-sm w-full shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-4 text-center">{message}</p>
        <button
          onClick={onClose}
          className="block mx-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

export default Modal;
