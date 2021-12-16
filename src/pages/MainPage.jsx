import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { fetchAllGames } from "../apiIntegration/api";
import GameCard from "../components/GameCard";

const MainPage = () => {
  const [games, setGames] = useState([]);
  const [response, setResponse] = useState(false);
  const [backToLogin, setBackToLogin] = useState(false);

  useEffect(() => {
    
    if(!response) {
      fetchAllGames().then((r) => setResponse(r));
    }

    if(response.message) {
      return setBackToLogin(true);
    }
  
    if(response.games) {
      return setGames(response.games);
    }

  }, [response]);

  if(backToLogin) {
    return <Navigate to="/" />;
  }

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
