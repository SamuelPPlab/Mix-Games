import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { getLocalStorageKey } from "../services/getKey";

const MainPage = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    getLocalStorageKey('mixCheckout');

    if(games.length === 0) {
      setGames(JSON.parse(localStorage.getItem('gameStock')));
    }
  }, [games]);

  if(games.length === 0) return <div>loading</div>

  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100vw' }}>
      {
        games.map((game) => <GameCard key={Math.random()} data={game} />)
      }
    </div>
  );
}
export default MainPage;
