import React, { useState } from "react";
import Input from "../components/Input";

const GameRegisterPage = () => {

  // nome, preço, estoque, imagem

  const [gameName, setGameName] = useState('');
  const [gamePrice, setGamePrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [gameIMG, setGameIMG] = useState('');
  const [chosenCurrency, setChosenCurrency] = useState('Reais');
  console.log(chosenCurrency)

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

  return(
    <div>
      <Input {...gameNameProps} />
      <div>
        <Input {...gamePriceProps} />
        <select onChange={({ target: { value } }) => setChosenCurrency(value)}>
          {currencyOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <Input {...quantityInStockProps} />
      <Input {...gameImageProps} />
    </div>
  );
};

export default GameRegisterPage;
