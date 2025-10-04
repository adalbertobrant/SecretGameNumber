import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import iaImage from "../img/ia.png";

const Game = () => {
  const { user, updateGameStats } = useAuth();
  const [secretNumber, setSecretNumber] = useState(0);
  const [attempts, setAttempts] = useState(1);
  const [guess, setGuess] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [language, setLanguage] = useState("pt-BR");
  const [btnGuessText, setBtnGuessText] = useState("");
  const [btnNewGameText, setBtnNewGameText] = useState("");

  const numberLimit = 10;

  const messages = {
    "pt-BR": {
      title: "Jogo do número secreto",
      chooseNumber: `Escolha um número entre 1 e ${numberLimit}`,
      btnGuess: "Chutar",
      btnNewGame: "Novo jogo",
      correct: "Acertou!",
      attempts: (num) =>
        `Você descobriu o número secreto com ${num} ${
          num === 1 ? "tentativa" : "tentativas"
        }!`,
      higher: "O número secreto é maior",
      lower: "O número secreto é menor",
    },
    "en-US": {
      title: "Secret number game",
      chooseNumber: `Choose a number between 1 and ${numberLimit}`,
      btnGuess: "Guess",
      btnNewGame: "New game",
      correct: "Correct!",
      attempts: (num) =>
        `You discovered the secret number with ${num} ${
          num === 1 ? "attempt" : "attempts"
        }!`,
      higher: "The secret number is higher",
      lower: "The secret number is lower",
    },
  };

  const t = (key, params = {}) => {
    const msg = messages[language][key];
    return typeof msg === "function" ? msg(params.attempts) : msg;
  };

  const generateRandomNumber = () => {
    let newNumber = Math.floor(Math.random() * numberLimit) + 1;

    if (usedNumbers.length === numberLimit) {
      setUsedNumbers([]);
    }

    if (usedNumbers.includes(newNumber)) {
      return generateRandomNumber();
    }

    setUsedNumbers((prev) => [...prev, newNumber]);
    return newNumber;
  };

  const initializeGame = () => {
    const newSecretNumber = generateRandomNumber();
    setSecretNumber(newSecretNumber);
    setAttempts(1);
    setGuess("");
    setGameWon(false);
    setTitle(t("title"));
    setMessage(t("chooseNumber"));
    setBtnGuessText(t("btnGuess"));
    setBtnNewGameText(t("btnNewGame"));
  };

  useEffect(() => {
    initializeGame();
  }, [language]);

  const handleGuess = async () => {
    const guessNumber = parseInt(guess);

    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > numberLimit) {
      toast.error(`Please enter a number between 1 and ${numberLimit}`);
      return;
    }

    if (guessNumber === secretNumber) {
      setTitle(t("correct"));
      setMessage(t("attempts", { attempts }));
      setGameWon(true);

      // Update game stats in backend only if user is logged in
      if (user && updateGameStats) {
        try {
          await updateGameStats(true, attempts);
        } catch (error) {
          console.error("Failed to update game stats:", error);
        }
      }

      toast.success(`🎉 ${t("attempts", { attempts })}`);
    } else {
      const hint = guessNumber > secretNumber ? t("lower") : t("higher");
      setMessage(hint);
      setAttempts((prev) => prev + 1);
      setGuess("");
    }
  };

  const handleNewGame = async () => {
    if (!gameWon && attempts > 1 && user && updateGameStats) {
      // Update stats for lost game only if user is logged in
      try {
        await updateGameStats(false, attempts);
      } catch (error) {
        console.error("Failed to update game stats:", error);
      }
    }
    initializeGame();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !gameWon && guess) {
      handleGuess();
    }
  };

  return (
    <div className="container">
      <div className="container__conteudo">
        <div className="container__informacoes">
          <select
            id="select-idioma"
            className="container__select-idioma"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="pt-BR">🇧🇷 Português</option>
            <option value="en-US">🇺🇸 English</option>
          </select>

          <div className="container__texto">
            <h1>{title}</h1>
            <p className="texto__paragrafo">{message}</p>
          </div>

          <input
            type="number"
            min="1"
            max={numberLimit}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            className="container__input"
          />

          <div className="chute container__botoes">
            <button
              onClick={handleGuess}
              id="btn-chutar"
              className="container__botao"
              disabled={gameWon || !guess}
            >
              {btnGuessText}
            </button>
            <button
              onClick={handleNewGame}
              id="reiniciar"
              className="container__botao"
              disabled={false}
            >
              {btnNewGameText}
            </button>
          </div>

          {/* Show game stats for logged-in users */}
          {user && (
            <div className="user-game-stats">
              <p>Games Played: {user.gameStats?.gamesPlayed || 0}</p>
              <p>Games Won: {user.gameStats?.gamesWon || 0}</p>
              {user.gameStats?.bestScore && (
                <p>Best Score: {user.gameStats.bestScore} attempts</p>
              )}
            </div>
          )}

          {/* Show encouragement for guest users */}
          {!user && (
            <div className="guest-encouragement">
              <p>🎮 Playing as Guest</p>
              <p>Sign up to track your game statistics!</p>
            </div>
          )}
        </div>

        <img
          src={iaImage}
          alt="Uma pessoa olhando para a esquerda"
          className="container__imagem-pessoa"
        />
      </div>
    </div>
  );
};

export default Game;
