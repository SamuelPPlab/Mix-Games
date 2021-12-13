import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import GameCard from "../components/GameCard";
import { getLocalStorageKey } from "../services/getKey";

const MainPage = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    setGames(getLocalStorageKey('gameStock'));
  }, []);

  if(!games) return <div>loading</div>;

  if(games.length === 0) return <h1>Não há itens no estoque.</h1>;

  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100vw' }}>
      <Link to="/checkout">
        <button id='mix-go-to-checkout'>Ver carrinho</button>
      </Link>
      {
        games.map((game) => <GameCard key={Math.random()} data={game} />)
      }
    </div>
  );
};

export default MainPage;
