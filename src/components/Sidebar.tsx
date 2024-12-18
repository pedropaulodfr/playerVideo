import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { HomeContext } from "../app/context/HomeContext";
import { FcNext } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";

const Sidebar: React.FC = () => {
  const { onChangeVideo, videos } = useContext(HomeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [listNovelasOpen, setListNovelasIsOpen] = useState(false);
  const [novelaSelecionada, setNovelaSelecionada] = useState<string>('')

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const toggleNovelas = () => {
    setListNovelasIsOpen(!listNovelasOpen);
  };

  const onChangeNovela = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof window !== "undefined") { 
      setNovelaSelecionada(event.target.value)
      localStorage.removeItem("ultimoVideo")
      localStorage.setItem("ultimaNovela", event.target.value)
    }
  }

  const listaNovelas = [
    {titulo: "Flor do Caribe", url: "https://playervideo.onrender.com/"},
    {titulo: "Totalmente Demais", url: "https://totalmentedemais.onrender.com/"}
  ]

  return (
    <div className={isOpen ? styles.sidebarOpen : styles.sidebarClosed}>
      <button onClick={toggleSidebar} className={styles.toggleButton}>
        {isOpen ? <IoCloseSharp color="red" /> : <FcNext />}
      </button>
      <nav className={styles.menu}>
        <ul className={isOpen ? styles.menuList : styles.menuListClosed}>
          <h1 style={{ fontSize: "1.3em", fontWeight: "bold" }}>Lista de Novelas<CiBoxList onClick={toggleNovelas} size={30} style={{cursor: "pointer"}}/></h1>
          {listNovelasOpen &&
            listaNovelas.map((novela, key) => (
              <Link href={novela.url} key={key} style={{ display: 'block', marginBottom: '8px' }}>
                {novela.titulo}
              </Link>
            ))
          }
        </ul>
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
