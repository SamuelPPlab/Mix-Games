import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { gameNameValidation, numberValidation } from "../services/validators";
import RegisterGameBackground from "../images/RegisterGameBackground.jpg";
import { postGame } from "../apiIntegration/api";
import '../css/styles.css';

const GameRegisterPage = () => {

  const [gameName, setGameName] = useState('');
  const [gamePrice, setGamePrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [gameIMG, setGameIMG] = useState('');
  const [allowGameRegister, setAllowGameRegister] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [postResponse, setPostResponse] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(false);
  const [backToLogin, setBackToLogin] = useState(false);

  useEffect(() => {
    const isNameValid = gameNameValidation(gameName);
    const isPriceValid = numberValidation(gamePrice);
    const isStockValid = numberValidation(stockQuantity);

    if(isNameValid && isPriceValid && isStockValid) {
      return setAllowGameRegister(true);
    }
    return setAllowGameRegister(false);
  }, [gamePrice, gameName, stockQuantity]);

  useEffect(() => {
    if (postResponse.message && postResponse.message === 'Jogo registrado.') {
      return setRedirect(true);
    }

    if (postResponse.message && postResponse.message !== 'Token inválido!') {
      return setFeedbackMessage(postResponse.message);
    }

    if (postResponse.message && postResponse.message === 'Token inválido!') {
      return setBackToLogin(true);
    }
  }, [postResponse]);

  const gameNameProps = {
    id: 'mix-game-name',
    name: 'Nome do jogo:',
    setFieldValue: setGameName,
    fieldValue: gameName,
    placeholder: 'Como é o nome desse jogo?',
    placeholderClass: gameName === '' ? 'placeholderSpan' : 'placeholderSpanFocus gamePlaceholder',
  };

  const gamePriceProps = {
    id: 'mix-game-price',
    name: 'Preço em Reais:',
    setFieldValue: setGamePrice,
    fieldValue: gamePrice,
    type: 'number',
    step: 'any',
    placeholder: 'Quanto vai custar? (em Reais)',
    placeholderClass: gamePrice === '' ? 'placeholderSpan' : 'placeholderSpanFocus gamePlaceholder',
  };

  const quantityInStockProps = {
    id: 'mix-stock-quantity',
    name: 'Quantas unidades em estoque?',
    setFieldValue: setStockQuantity,
    fieldValue: stockQuantity,
    type: 'number',
    placeholder: 'Quanto temos no estoque?',
    placeholderClass: stockQuantity === '' ? 'placeholderSpan' : 'placeholderSpanFocus gamePlaceholder',
  };

  const gameImageProps = {
    id: 'mix-game-image',
    name: 'Cole o URL da imagem:',
    setFieldValue: setGameIMG,
    fieldValue: gameIMG,
    placeholder: 'Cole o URL da capa do jogo.',
    placeholderClass: gameIMG === '' ? 'placeholderSpan' : 'placeholderSpanFocus gamePlaceholder',
  };

  const submitGameProps = {
    name: "Registrar Jogo",
    id: "mix-submitGame",
    onClick: () => {
      postGame(gameName, gamePrice, stockQuantity, gameIMG).then(
        (r) => r.json()).then((r) => setPostResponse(r),
      );
    },
    disabled: !allowGameRegister,
    className: 'mix-left-form-submit',
  };

  if (redirect) return <Navigate to="/main" />;

  if (backToLogin) return <Navigate to="/" />;

  const noEmptyNameWarning = <div className="warningText">O nome do jogo não pode estar vazio.</div>;
  const noFreeGameWarning = <div className="warningText">O seu jogo não vai ser vendido de graça.</div>;
  const noEmptyStock = <div className="warningText">Você não pode deixar o estoque vazio.</div>;
  const addAnImageURL = <div className="warningText">Por favor adicione a URL.</div>;

  return(
    <div style={{ width: '100vw', height: '100vh' }}>
      <img src={RegisterGameBackground} alt="Background" className="backgroundImage" />
      <div className="leftSideForm">
        <h1 className="orange-title">Registre seu game</h1>
        <div className="halfScreenWidth">
          <Input {...gameNameProps} />
          {gameName === '' && noEmptyNameWarning}
        </div>
        <div className="halfScreenWidth">
          <Input {...gamePriceProps} />
          {(gamePrice === '0' || gamePrice === '') && noFreeGameWarning}
        </div>
        <div className="halfScreenWidth">
          <Input {...quantityInStockProps} />
          {(stockQuantity === '' || stockQuantity === '0') && noEmptyStock}
        </div>
        <div className="halfScreenWidth">
          <Input {...gameImageProps} />
          {gameIMG === '' && addAnImageURL}
        </div>
        {feedbackMessage && <div className="warningText">{JSON.stringify(feedbackMessage)}</div>}
        <Button {...submitGameProps} />
      </div>
    </div>
  );
};

export default GameRegisterPage;
