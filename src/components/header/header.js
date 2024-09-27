import { NavLink } from "react-router-dom";
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
  return (
    <div className="hdr">
      {menu.map((item) => (
        <NavLink key={item.to} to={item.to}>
          {item.title}
        </NavLink>
      ))}
    </div>
  );
};
