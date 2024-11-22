"use client";
import React, { createContext, ReactNode, useState, useEffect, useRef, SetStateAction } from "react";
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

  const onChangePlay = () => {
    setPlay(!play)
  }

  const onChangePlayBool = (status: boolean) => {
    setPlay(status);
  };

  const onChangeVolume = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setVolume(newValue / 100);
    }
  };

  const onChangeBotaoVolume = () => {
    setBotaoVolume(!botaoVolume);
  };

  const onChangeVideo = (videoAtual: Video, acao: string) => {
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
  };

  const onChangeFullScreen = () => {
    setFullScreen(!fullScreen)
  }

  const onChangeLoop = () => {
    setLoop(!loop)
  }

  useEffect(() => {
    const ultimoVideo = localStorage.getItem("ultimoVideo")
    
    if (ultimoVideo != null) {
      const ultimoVideoJSON = JSON.parse(ultimoVideo)

      onChangeVideo(ultimoVideoJSON, "load")
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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
