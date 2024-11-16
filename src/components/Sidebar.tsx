import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { videos } from "../app/dados/video";
import { HomeContext } from "../app/context/HomeContext";
import { FcNext } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar: React.FC = () => {
  const { onChangeVideo } = useContext(HomeContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {isOpen ? <IoCloseSharp color="red" /> : <FcNext />}
      </button>
      <nav className={styles.menu}>
        <ul className={isOpen ? styles.menuList : styles.menuListClosed}>
          <h1 style={{ fontSize: "1.3em", fontWeight: "bold" }}>Lista de Capítulos</h1>
          {videos.map((m, index) => (
            <li className={styles.menuItem} key={index}>
              <Link
                href="#"
                onClick={() => { onChangeVideo(m, "load"); setIsOpen(false) }}
                className={styles.menuLink}
              >
                <img src={m.image} alt={m.name} />
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
