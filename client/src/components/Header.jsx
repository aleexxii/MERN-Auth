import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const {currentUser} = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <h1>Auth App</h1>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
          {currentUser ? (<img src={currentUser.profilePicture} alt="user" className="w-8 h-8 rounded-full object-cover"/>) :
            (<li>Sign In</li>)
          }
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
