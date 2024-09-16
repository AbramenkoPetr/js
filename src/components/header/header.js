import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../theme-context";

const menu = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Chat",
    to: "/chat",
  },
  {
    title: "Profile",
    to: "/profile",
  },
  {
    title: "Gists",
    to: "/gists",
  },
];

export const Header = () => {
  const { theme, themeSetter } = useContext(ThemeContext);

  return (
    <div className="hdr">
      <h1 className="hidden">{theme.name}</h1>
      <button className="hidden"
        disabled={theme.name === "light"}
        onClick={() => themeSetter("light")}
      >
        light
      </button>
      <button className="hidden"
        disabled={theme.name === "dark"}
        onClick={() => themeSetter("dark")}
      >
        dark
      </button>

      {menu.map((item) => (
        <NavLink key={item.to} to={item.to}>
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};
