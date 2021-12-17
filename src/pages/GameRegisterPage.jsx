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
  // Estado para guardar o nome do jogo

  const [gamePrice, setGamePrice] = useState('');
  // Estado para guardar o preço do jogo

  const [stockQuantity, setStockQuantity] = useState('');
  // Estado para guardar a quantidade no estoque

  const [gameIMG, setGameIMG] = useState('');
  // Estado para guardar o URL da imagem da capa do jogo

  const [allowGameRegister, setAllowGameRegister] = useState(false);
  // Estado para controlar o botão se submit

  const [redirect, setRedirect] = useState(false);
  // Estado para controlar se o usuario deve ser retornado para a tela principal

  const [postResponse, setPostResponse] = useState(false);
  // Estado para guardar a resposta da api

  const [feedbackMessage, setFeedbackMessage] = useState(false);
  // Estado para guardar alguma mensagem de aviso que veio do backend

  const [backToLogin, setBackToLogin] = useState(false);
  // Estado para redirecionar o usuario para a pagina de login caso ele não seja registrado

  useEffect(() => {
    // Função para observar os dados do form e liberar o botão submit caso os dados sejam validos
    const isNameValid = gameNameValidation(gameName);
    const isPriceValid = numberValidation(gamePrice);
    const isStockValid = numberValidation(stockQuantity);

    if(isNameValid && isPriceValid && isStockValid) {
      return setAllowGameRegister(true);
    }
    return setAllowGameRegister(false);
  }, [gamePrice, gameName, stockQuantity]);

  useEffect(() => {
    // Função para tratar avisos do backend de acordo com cada resposta
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
      // Função para enviar os dados para o backend
      postGame(gameName, gamePrice, stockQuantity, gameIMG).then(
        (r) => r.json()).then((r) => setPostResponse(r),
      );
    },
    disabled: !allowGameRegister,
    className: 'mix-left-form-submit',
  };

  if (redirect) return <Navigate to="/main" />;

  if (backToLogin) return <Navigate to="/" />;

  // Avisos dos campos de input

  const noEmptyNameWarning = <div className="warningText">
    O nome do jogo não pode estar vazio.
  </div>;

  const noFreeGameWarning = <div className="warningText">
    O seu jogo não vai ser vendido de graça.
  </div>;

  const noEmptyStock = <div className="warningText">
    Você não pode deixar o estoque vazio.
  </div>;

  const addAnImageURL = <div className="warningText">
    Por favor adicione a URL.
  </div>;

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
