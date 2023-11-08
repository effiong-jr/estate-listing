import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Debull</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <div>
          <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-24 sm:w-64"
            />
            <FaSearch className="text-slate-600" />
          </form>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
            <Link to={"/"}>
              <li className="hidden sm:inline hover:underline cursor-pointer">
                Home
              </li>
            </Link>

            <Link to={"/about"}>
              <li className="hidden sm:inline hover:underline cursor-pointer">
                About
              </li>
            </Link>

            <Link to={"/profile"}>
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  className="h-7 w-7 rounded-full object-cover"
                  alt="avatar"
                />
              ) : (
                <li className="hover:underline cursor-pointer">Sign In</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
