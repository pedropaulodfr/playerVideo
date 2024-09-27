"use client";
import React, { createContext, ReactNode, useState, useEffect, SetStateAction } from "react";

type HomeContextData = {
  playing: boolean;
  onChangePlay: () => void;
  volume: number;
  onChangeVolume: (event: Event, newValue: number | number[]) => void;
  botaoVolume: boolean;
  onChangeBotaoVolume: () => void;
  onChangeAudio: (musica: string, index: number) => void;
  musicaSelecionada: number;
  setMusicaSelecionada: React.Dispatch<React.SetStateAction<number>>;
  onSeek: (event: Event, newValue: number | number[]) => void;
  currentTime: number,
  duration: number
};

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
  children: ReactNode;
};

const HomeContextProvider = ({ children }: ProviderProps) => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(30);
  const [botaoVolume, setBotaoVolume] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [musicaSelecionada, setMusicaSelecionada] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const onChangePlay = () => {
    if (audio) {
      if (playing) 
        audio.pause(); 
      else
        audio.play(); 
      
      setPlaying(!playing); 
    }
  };

  const onSeek = (event: Event, newValue: number | number[]) => {
    if (audio) {
      audio.currentTime = newValue as number;
      setCurrentTime(newValue as number);
    }
  };
  
  
  // Atualiza o áudio quando uma nova música for selecionada
  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        setPlaying(false); // Reseta o estado quando a música termina
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime); // Atualiza o tempo atual
        setDuration(audio.duration || 0);  // Atualiza a duração total da música
      };
      
      // Sincroniza o volume do novo áudio
      audio.volume = volume / 100;
      if (playing)
        audio.pause();
      else 
        audio.play();
    }
  }, [audio, playing, volume, musicaSelecionada]); 

  /* Chamar a função onChangeAudio assim que iniciar o app para deixar a última música tocada já preparada para reproduzir */
  useEffect(() => {
    const ultimaMusica = localStorage.getItem("ultimaMusica");
    const ultimaMusicaJson = ultimaMusica != null ? JSON.parse(ultimaMusica) : {musica: "musicas/audio1.mp3", index: 0}

    onChangeAudio(ultimaMusicaJson.musica, ultimaMusicaJson.index);
  }, []); 
  

  const onChangeVolume = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const onChangeBotaoVolume = () => {
    setBotaoVolume(!botaoVolume);
  };

  const onChangeAudio = (musica: string, index: number) => {
    console.log(musica, index)
    if (audio)
      audio.pause(); // Pausa a música atual antes de trocar
  
    const newAudio = new Audio(musica); // Cria o novo áudio
    newAudio.volume = volume / 100; // Ajusta o volume do novo áudio
    setAudio(newAudio); // Atualiza o estado com o novo áudio
    setPlaying(true); // Define como tocando
    setMusicaSelecionada(index); // Atualiza index da nova música
  
    newAudio.play(); // Toca a nova música

    localStorage.setItem("ultimaMusica", JSON.stringify({musica: musica, index: index}))
  };

  return (
    <HomeContext.Provider
      value={{
        playing,
        onChangePlay,
        volume,
        onChangeVolume,
        botaoVolume,
        onChangeBotaoVolume,
        onChangeAudio,
        musicaSelecionada,
        setMusicaSelecionada,
        currentTime,
        duration,
        onSeek
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
