"use client";
import React, { createContext, ReactNode, useState, useEffect, useRef, SetStateAction } from "react";
import Parametros from "@/helpers/functions"
import { Totalmente_Demais_ , Flor_do_Caribe } from '../dados/video';

type Video = {
  name: string;
  author: string;
  description: string;
  urlVideo: string;
  image: string;
  cover: string
}

type HomeContextData = {
  play: boolean;
  onChangePlay: () => void;
  onChangePlayBool: (status: boolean) => void;
  videoSelecionado: Video;
  videos: Video[];
  onChangeVideo: (urlVideoAtual: Video, acao: string) => void;
  volume: number;
  onChangeVolume: (event: Event, newValue: number | number[]) => void;
  botaoVolume: boolean;
  onChangeBotaoVolume: () => void;
  fullScreen: boolean;
  onChangeFullScreen: () => void;
  loop: boolean;
  onChangeLoop: () => void;
  botaoPularIntro: boolean;
  botaoPularIntroClick: boolean;
  onChangeBotaoPularIntro: (status: boolean) => void;
  handleBotaoPularIntro: () => void;
  botaoPularEncerramento: boolean;
  botaoPularEncerramentoClick: boolean;
  onChangeBotaoPularEncerramento: (status: boolean) => void;
  handleBotaoPularEncerramento: () => void;
  corPrimaria: string;
  corSecundaria: string;
  corInversa: string;
  onChangeDarkMode: () => void;
};

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
  children: ReactNode;
};

const HomeContextProvider = ({ children }: ProviderProps) => {
  const [videos, setVideos] = useState<Video[]>(Flor_do_Caribe)
  const [volume, setVolume] = useState<number>(1);
  const [botaoVolume, setBotaoVolume] = useState<boolean>(false);
  const [videoSelecionado, setVideoSelecionado] = useState<Video>(videos[0])
  const [fullScreen, setFullScreen] = useState(false)
  const [loop, setLoop] = useState(false)
  const [play, setPlay] = useState(false)
  const [botaoPularIntro, setBotaoPularIntro] = useState(false)
  const [botaoPularIntroClick, setBotaoPularIntroClick] = useState(false)
  const [botaoPularEncerramento, setBotaoPularEncerramento] = useState(false)
  const [botaoPularEncerramentoClick, setBotaoPularEncerramenroClick] = useState(false)
  const [darkMode, setDarkMode] = useState(JSON.parse(Parametros.pegarParametro("darkMode")) ?? false)
  const [corPrimaria, corSecundaria, corInversa] = 
    [darkMode ? Parametros.darkColors()[0].primaria : Parametros.lightColors()[0].primaria, 
      darkMode ? Parametros.darkColors()[0].secundaria : Parametros.lightColors()[0].secundaria, 
      darkMode ? Parametros.lightColors()[0].primaria : Parametros.darkColors()[0].primaria, 
    ]

  const onChangeDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const onChangePlay = () => { setPlay(!play) }

  const onChangePlayBool = (status: boolean) => { setPlay(status) }

  const onChangeVolume = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setVolume(newValue / 100);
    }
  };

  const onChangeBotaoVolume = () => { setBotaoVolume(!botaoVolume) }
  
  const onChangeBotaoPularIntro = (status: boolean) => { setBotaoPularIntro(status) }
  
  const handleBotaoPularIntro = () => { setBotaoPularIntroClick(!botaoPularIntroClick) }
  const handleBotaoPularEncerramento = () => { setBotaoPularEncerramenroClick(!botaoPularEncerramentoClick) }

  const onChangeBotaoPularEncerramento = (status: boolean) => { setBotaoPularEncerramento(status) }

  const onChangeVideo = (videoAtual: Video, acao: string) => {
    if (typeof window !== "undefined") { 
      localStorage.setItem("pularIntro", "false")
      localStorage.setItem("pularEncerramento", "false")
  
      const posicao = videos.findIndex(v => v.urlVideo === videoAtual.urlVideo);
      if (acao === "next"){
        setVideoSelecionado(videos[posicao + 1])
        localStorage.setItem("ultimoVideo", JSON.stringify(videos[posicao + 1]))
      } else if (acao === "prev" && posicao !== 0) {
        setVideoSelecionado(videos[posicao - 1])
        localStorage.setItem("ultimoVideo", JSON.stringify(videos[posicao - 1]))
      } else if (acao === "load") {
        setVideoSelecionado(videoAtual)
        localStorage.setItem("ultimoVideo", JSON.stringify(videoAtual))
      }
    }
  };

  const onChangeFullScreen = () => { setFullScreen(!fullScreen) }

  const onChangeLoop = () => { setLoop(!loop) }

  useEffect(() => {
    if (typeof window !== "undefined") { 
      const ultimoVideo = localStorage.getItem("ultimoVideo")
      
      if (ultimoVideo != null) {
        const ultimoVideoJSON = JSON.parse(ultimoVideo)
  
        onChangeVideo(ultimoVideoJSON, "load")
      }
    }
    
  }, [])

  return (
    <HomeContext.Provider
      value={{
        play, onChangePlay, onChangePlayBool,
        videos, videoSelecionado, onChangeVideo,
        volume, onChangeVolume,
        botaoVolume, onChangeBotaoVolume,
        fullScreen, onChangeFullScreen,
        loop, onChangeLoop,
        botaoPularIntro, botaoPularIntroClick, 
        onChangeBotaoPularIntro, handleBotaoPularIntro,
        botaoPularEncerramento, botaoPularEncerramentoClick, 
        onChangeBotaoPularEncerramento, handleBotaoPularEncerramento,
        corPrimaria, corSecundaria, corInversa, onChangeDarkMode
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
