import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { musics } from "../app/dados/music";
import { HomeContext } from "../app/context/HomeContext";
import { FcNext } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar: React.FC = () => {
  const { onChangeAudio } = useContext(HomeContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {isOpen ? <IoCloseSharp style={{color: "red"}}/> : <FcNext />}
      </button>
      <nav className={styles.menu}>
        <ul className={isOpen ? styles.menuList : styles.menuListClosed}>
        <h1 style={{fontSize: "1.3em", fontWeight: "bold"}}>Lista de Músicas</h1>
          {musics.map((m, index) => (
            <li className={styles.menuItem} key={index}>
              <Link
                href="#"
                onClick={() =>{ onChangeAudio(m.urlAudio, index); setIsOpen(false)}}
                className={styles.menuLink}
              >
                {m.name} - {m.author}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
