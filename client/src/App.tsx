import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderBoardPage";
import GamePage from "./pages/GamesPage";

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
