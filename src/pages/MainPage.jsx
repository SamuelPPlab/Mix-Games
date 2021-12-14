import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import { getLocalStorageKey } from "../services/getKey";
import MainPageBackground from '../images/MainPageBackground.jpg';

const MainPage = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    setGames(getLocalStorageKey('gameStock'));
  }, []);

  if(!games) return <div>loading</div>;

  if(games.length === 0) return <h1>Não há itens no estoque.</h1>;

  return(
    <div id="mainPageContainer">
      <div id="mainPageHeader">
        <Link to="/register-game">
          <button id="mix-register-game">Registrar um jogo</button>
        </Link>
        <h1>Veja nossos jogos: </h1>
        <Link to="/checkout">
          <button id='mix-go-to-checkout'>Ver carrinho</button>
        </Link>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '85%' }}>
        {
          games.map((game) => <GameCard key={Math.random()} data={game} />)
        }
      </div>
    </div>
  );
};

export default MainPage;
