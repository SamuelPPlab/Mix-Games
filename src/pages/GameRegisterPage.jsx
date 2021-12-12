import React, { useState } from "react";
import Input from "../components/Input";

const GameRegisterPage = () => {

  // nome, preço, estoque, imagem

  const [gameName, setGameName] = useState('');
  const [gamePrice, setGamePrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [gameIMG, setGameIMG] = useState('');

  const gameNameProps = {
    id: 'mix-game-name',
    name: 'Nome do jogo',
    setFieldValue: setGameName,
  };

  const gamePriceProps = {
    id: 'mix-game-price',
    name: 'Preço',
    setFieldValue: setGamePrice,
    type: 'number',
    step: 'any',
  };

  const quantityInStockProps = {
    id: 'mix-stock-quantity',
    name: 'Quantas unidades em estoque?',
    setFieldValue: setStockQuantity,
    type: 'number',
  };

  const gameImageProps = {
    id: 'mix-game-image',
    name: 'Cole o URL da imagem',
    setFieldValue: setGameIMG,
  };

  return(
    <div>
      <Input {...gameNameProps} />
      <Input {...gamePriceProps} />
      <Input {...quantityInStockProps} />
      <Input {...gameImageProps} />
    </div>
  );
};

export default GameRegisterPage;
