import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { saveGameData } from "../services/localstorage";
import { gameNameValidation, numberValidation } from "../services/validators";

const GameRegisterPage = () => {

  const [gameName, setGameName] = useState('');
  const [gamePrice, setGamePrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [gameIMG, setGameIMG] = useState('');
  const [chosenCurrency, setChosenCurrency] = useState('Reais');
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
    name: 'Nome do jogo',
    setFieldValue: setGameName,
    fieldValue: gameName,
  };

  const gamePriceProps = {
    id: 'mix-game-price',
    name: 'Preço',
    setFieldValue: setGamePrice,
    fieldValue: gamePrice,
    type: 'number',
    step: 'any',
  };

  const currencyOptions = ['Reais', 'Euros', 'Dólares', 'Ienes', 'Pesos', 'Francos Suíços'];

  const quantityInStockProps = {
    id: 'mix-stock-quantity',
    name: 'Quantas unidades em estoque?',
    setFieldValue: setStockQuantity,
    fieldValue: stockQuantity,
    type: 'number',
  };

  const gameImageProps = {
    id: 'mix-game-image',
    name: 'Cole o URL da imagem',
    setFieldValue: setGameIMG,
    fieldValue: gameIMG,
  };

  const submitGameProps = {
    name: "Registrar Jogo",
    id: "mix-submitGame",
    onClick: () => {
      saveGameData(gameName, gamePrice, chosenCurrency, stockQuantity, gameIMG);
      setRedirect(true);
    },
    disabled: !allowGameRegister,
  };

  if(redirect) return <Navigate to="/main" />;

  return(
    <div>
      <Input {...gameNameProps} />
      <div style={{ display: 'flex' }}>
        <Input {...gamePriceProps} />
        <select onChange={({ target: { value } }) => setChosenCurrency(value)}>
          {currencyOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <Input {...quantityInStockProps} />
      <Input {...gameImageProps} />
      <Button {...submitGameProps} />
    </div>
  );
};

export default GameRegisterPage;
