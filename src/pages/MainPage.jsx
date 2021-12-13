import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import GameCard from "../components/GameCard";

const MainPage = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    if(games.length === 0) {
      setGames(JSON.parse(localStorage.getItem('gameStock')));
    }
  }, [games]);

  if(games.length === 0) return <div>loading</div>;

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
