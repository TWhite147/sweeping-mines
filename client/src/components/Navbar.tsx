import { Link } from "react-router-dom";

function Navbar(): JSX.Element {
  return (
      <div>
          <Link to="/">
            Home
          </Link>
          <Link to="/games">
            Games
          </Link>
          <Link to="/leaderboard">
            Leaderboard
          </Link>
      </div>
  );
}

export default Navbar;
