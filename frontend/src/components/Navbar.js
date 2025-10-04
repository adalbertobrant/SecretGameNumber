import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CreditsModal from "./CreditsModal";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showCredits, setShowCredits] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/game" className="navbar-brand">
            🎮 Secret Game
          </Link>

          <div className="navbar-menu">
            <button
              onClick={() => setShowCredits(true)}
              className="navbar-btn credits-btn"
            >
              Credits
            </button>

            {user ? (
              <div className="navbar-user">
                <span className="user-welcome">Welcome, {user.name}!</span>
                <div className="user-stats">
                  <span>Games: {user.gameStats?.gamesPlayed || 0}</span>
                  <span>Won: {user.gameStats?.gamesWon || 0}</span>
                  {user.gameStats?.bestScore && (
                    <span>Best: {user.gameStats.bestScore} attempts</span>
                  )}
                </div>
                <button onClick={logout} className="navbar-btn logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-auth">
                <span className="guest-info">Playing as Guest</span>
                <Link to="/login" className="navbar-btn login-btn">
                  Login
                </Link>
                <Link to="/register" className="navbar-btn register-btn">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <CreditsModal
        isOpen={showCredits}
        onClose={() => setShowCredits(false)}
      />
    </>
  );
};

export default Navbar;
