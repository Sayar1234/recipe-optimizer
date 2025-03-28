import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const linkClass = (path: string) =>
    `px-4 py-2 rounded-md hover:bg-gray-200 transition ${
      pathname === path ? "bg-gray-300 font-semibold" : ""
    }`;

  return (
    <nav className="flex justify-center gap-6 p-4 shadow bg-white">
      <Link to="/" className={linkClass("/")}>
        Home
      </Link>
      <Link to="/search" className={linkClass("/search")}>
        Search
      </Link>
      <Link to="/add" className={linkClass("/add")}>
        Add Recipe
      </Link>
      <Link to="/bookmarks" className={linkClass("/bookmarks")}>
        Bookmarks
      </Link>
      <Link to="/about" className={linkClass("/about")}>
        About
      </Link>
    </nav>
  );
};

export default Navbar;
