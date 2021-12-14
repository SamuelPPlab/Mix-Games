import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { saveGameData } from "../services/localstorage";
import { gameNameValidation, numberValidation } from "../services/validators";
import RegisterGameBackground from "../images/RegisterGameBackground.jpg";
import '../css/styles.css';

const GameRegisterPage = () => {

  const [gameName, setGameName] = useState('');
  const [gamePrice, setGamePrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [gameIMG, setGameIMG] = useState('');
  const [allowGameRegister, setAllowGameRegister] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const isNameValid = gameNameValidation(gameName);
    const isPriceValid = numberValidation(gamePrice);
    const isStockValid = numberValidation(stockQuantity);

    if(isNameValid && isPriceValid && isStockValid) {
      return setAllowGameRegister(true);
    }
    return setAllowGameRegister(false);
  }, [gamePrice, gameName, stockQuantity]);

  const gameNameProps = {
    id: 'mix-game-name',
    name: 'Nome do jogo:',
    setFieldValue: setGameName,
    fieldValue: gameName,
    placeholder: 'Qual o nome do jogo?',
  };

  const gamePriceProps = {
    id: 'mix-game-price',
    name: 'Preço em Reais:',
    setFieldValue: setGamePrice,
    fieldValue: gamePrice,
    type: 'number',
    step: 'any',
    placeholder: 'Quanto vai custar? (em Reais)',
  };

  const quantityInStockProps = {
    id: 'mix-stock-quantity',
    name: 'Quantas unidades em estoque?',
    setFieldValue: setStockQuantity,
    fieldValue: stockQuantity,
    type: 'number',
    placeholder: 'Quantas unidades no estoque?',
  };

  const gameImageProps = {
    id: 'mix-game-image',
    name: 'Cole o URL da imagem:',
    setFieldValue: setGameIMG,
    fieldValue: gameIMG,
    placeholder: 'Cole o URL da capa do jogo.'
  };

  const submitGameProps = {
    name: "Registrar Jogo",
    id: "mix-submitGame",
    onClick: () => {
      saveGameData(gameName, gamePrice, stockQuantity, gameIMG);
      setRedirect(true);
    },
    disabled: !allowGameRegister,
    className: 'mix-left-form-submit',
  };

  if(redirect) return <Navigate to="/main" />;

  return(
    <div style={{ width: '100vw', height: '100vh' }}>
      <img src={RegisterGameBackground} alt="Background" className="backgroundImage" />
      <div className="leftSideForm">
        <h1 style={{ fontSize: '3em' }}>Registre seu game</h1>
        <div className="halfScreenWidth">
          <Input {...gameNameProps} />
        </div>
        <div className="halfScreenWidth">
          <Input {...gamePriceProps} />
        </div>
        <div className="halfScreenWidth">
          <Input {...quantityInStockProps} />
        </div>
        <div className="halfScreenWidth">
          <Input {...gameImageProps} />
        </div>
        <Button {...submitGameProps} />
      </div>
    </div>
  );
};

export default GameRegisterPage;
