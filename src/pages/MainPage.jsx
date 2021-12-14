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
