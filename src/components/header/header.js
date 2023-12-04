import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../api/firebase";
import { ThemeContext } from "../../theme-context";

const menuWithoutSession = [
  {
    title: "Login",
    to: "/login",
  },
  {
    title: "SignUp",
    to: "/signup",
  },
];

const menuWithSession = [
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

export const Header = ({ email }) => {
  const { theme, themeSetter } = useContext(ThemeContext);

  return (
    <div className="hdr">
      {!!email && (
        <div style={{display: 'flex'}}>
          <h1>USER: {email}</h1>
          <div style={{margin: '0 0 0 10px'}}>
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            x
          </button>
          </div>
        </div>
      )}
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

      {!!email &&
        menuWithSession.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.title}
          </NavLink>
        ))}

      {!email &&
        menuWithoutSession.map((item) => (
          <NavLink key={item.to} to={item.to}>
            {item.title}
          </NavLink>
        ))}
    </div>
  );
};
