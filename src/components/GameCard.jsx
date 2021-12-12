import React from "react";

const GameCard = ({ data }) => {
  const { game, image, price, stock } = data;

  return <div style={{ width: '300px', height: '400px', margin: '20px' }}>
    <img src={image} alt="Capa do jogo." style={{ width: '300px', height: '190px' }} />
    <h1>{game}</h1>
    <p>{stock}</p>
    <h3>{price}</h3>
  </div>
};

export default GameCard;
