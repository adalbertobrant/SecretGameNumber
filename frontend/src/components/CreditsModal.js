import React from "react";

const CreditsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h2 className="modal-title">Créditos</h2>
        <p className="modal-subtitle">
          Obrigado a todos que tornaram este projeto possível!
        </p>

        <div className="credits-list">
          <div className="credit-item">
            <strong>Adalberto Brant</strong>
            <span>Mantenedor</span>
          </div>

          <div className="credit-item">
            <strong>Comunidade Open Source</strong>
            <span>Contribuidores</span>
          </div>

          <div className="credit-item">
            <strong>Hacktoberfest 2025</strong>
            <span>Participantes</span>
          </div>

          <div className="credit-item">
            <strong>MERN Stack</strong>
            <span>MongoDB, Express, React, Node.js</span>
          </div>
        </div>

        <div className="modal-footer">
          <p>🎮 Desenvolvido com ❤️ pela comunidade</p>
        </div>
      </div>
    </div>
  );
};

export default CreditsModal;
