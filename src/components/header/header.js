import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../theme-context";
import "./header.css"


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
];

export const Header = () => {
  const { theme, themeSetter } = useContext(ThemeContext);

  return (
    <div className="hdr">
      <h1 style={{display: "none"}}>{theme.name}</h1>
      <button style={{display: "none"}}
        disabled={theme.name === "light"}
        onClick={() => themeSetter("light")}
      >
        light
      </button>
      <button style={{display: "none"}}
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
