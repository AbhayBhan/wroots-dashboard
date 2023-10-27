import React from "react";

const MenuGroup = ({ children, activecondition }) => {
  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        activecondition && "bg-slate-200 rounded-xl"
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
};

export default MenuGroup;
