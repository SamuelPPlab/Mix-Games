import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

const MainPage = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    setGames(JSON.parse(localStorage.getItem('gameStock')));
  });

  if(games.length === 0) return <div>loading</div>

  return(
    <div>

    </div>
  );
}
export default MainPage;
