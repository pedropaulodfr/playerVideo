"use client";

import { useContext, useState } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { BiSkipNextCircle, BiSkipPreviousCircle, BiSolidVolumeFull, BiSolidVolumeLow, BiSolidVolume   } from "react-icons/bi";
import { RiFullscreenFill, RiMoreFill  } from "react-icons/ri";
import { TiArrowLoop } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeMute from "@mui/icons-material/VolumeMute";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Sidebar from '../components/Sidebar';
import PlayerVideo from "@/components/PlayerVideo";
import styles from '@/components/PlayerVideo.module.css'
import Switch from '@mui/material/Switch';
import Parametros from '../helpers/functions'

export default function Home() {
  const { videoSelecionado, onChangeVideo, play, onChangePlay, volume, onChangeVolume, botaoVolume, 
    onChangeBotaoVolume, onChangeFullScreen, loop, onChangeLoop, botaoPularIntro, botaoPularEncerramento, 
    handleBotaoPularIntro, handleBotaoPularEncerramento, corPrimaria, corSecundaria, corInversa, onChangeDarkMode,
    tempo, onChangeTempo, handleSliderTempo, videoRef } = useContext(HomeContext);
  const [more, setMore] = useState(false)
  const [settings, setSettings] = useState(false)
  const [pularIntro, setPularIntro] = useState(JSON.parse(Parametros.pegarParametro("skipIntro") ?? "false"))
  const [duracaoIntro, setDuracaoIntro] = useState(Parametros.pegarParametro("durationIntro") ?? 0)
  const [pularEncerramento, setPularEncerramento] = useState(JSON.parse(Parametros.pegarParametro("skipClosing") ?? "false"))
  const [tempoEncerramento, setTempoEncerramento] = useState(Parametros.pegarParametro("tempClosing") ?? 0)
  const [controlesPlayer, setControlesPlayer] = useState(JSON.parse(Parametros.pegarParametro("displayControls") ?? "false"))
  const [darkMode, setDarkMode] = useState(JSON.parse(Parametros.pegarParametro("darkMode") ?? "false"))
  
  if(typeof window !== "undefined") {
    if(localStorage.getItem("params") == undefined || localStorage.getItem("params") == null)
      localStorage.setItem("params", JSON.stringify([]))
  }

  const handlePularIntro = () => {
    Parametros.salvarParametros("skipIntro", !pularIntro)
    setPularIntro(!pularIntro)
  }

  const onChangeDuracaoIntro = (newValue: number) => {
    if (typeof newValue === "number") {
      Parametros.salvarParametros("durationIntro", newValue)
      setDuracaoIntro(newValue);
    }
  };
  
  const handlePularEncerramento = () => {
    Parametros.salvarParametros("skipClosing", !pularEncerramento)
    setPularEncerramento(!pularEncerramento)
  }

  const onChangeTempoEncerramento = (newValue: number) => {
    if (typeof newValue === "number") {
      Parametros.salvarParametros("tempClosing", newValue)
      setTempoEncerramento(newValue);
    }
  }

  const handleControlePlayer = () => {
    Parametros.salvarParametros("displayControls", !controlesPlayer)
    setControlesPlayer(!controlesPlayer)
  }

  const handleDarkMode = () => {
    Parametros.salvarParametros("darkMode", !darkMode)
    setDarkMode(!darkMode)
    onChangeDarkMode()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div style={{zIndex: 9999}}><Sidebar/></div>

      <div className="flex flex-col justify-center items-center">
        <section className="info-music">
          <div className="cover-music 2xl:w-full">
            <PlayerVideo videoSrc={videoSelecionado.urlVideo} mute={false} volume={volume} />
          </div>
          {videoRef?.current &&
            <div className="flex items-center sm:pl-1 md:pl-1 lg:pl-0 xl:pl-0 2xl:pl-36 mb-10 4xl:pl-96" >
              <label className={`${styles.label}`} style={{color: corSecundaria, width: '40px'}}>{Parametros.formatarTempo(videoRef?.current?.currentTime ?? 0)}</label>
              <Box className="flex min-w-screen max-sm:w-full sm:w-full md:w-full lg:w-10/12 2xl:w-7/12 4xl:w-9/12">
                <Slider className="slider-tempo" aria-label="Tempo" value={tempo * 100} onChange={handleSliderTempo} style={{color: corSecundaria}}/>
              </Box>
              <label className={`${styles.label}`} style={{color: corSecundaria}}>{Parametros.formatarTempo(videoRef?.current?.duration ?? 0)}</label>
            </div>
          }
          <div className="description-music 2xl:pl-48">
            <h1 style={{fontSize: "1.3em", fontWeight: "bold", color: corPrimaria}}>{videoSelecionado.name}</h1>
            <h2 style={{fontSize: "1em", fontWeight: "normal", color: corPrimaria}}>{videoSelecionado.author}</h2>
            {botaoPularIntro && <button className="buttonsAdicionais" onClick={handleBotaoPularIntro}>Pular Intro</button>}
            {botaoPularEncerramento && <button className="buttonsAdicionais" onClick={handleBotaoPularEncerramento}>Pular Encerramento</button>}
          </div>
        </section>

        <section className="flex flex-row justify-between">
          <div className={`controles flex flex-row ${styles.controles}`}>
            <button className="m-2" onClick={() => onChangeVideo(videoSelecionado, "prev")}><BiSkipPreviousCircle color={corPrimaria} size={45} /></button>
            <button className="m-2" onClick={() => onChangePlay()}>{play ? <FaRegCirclePause size={60} color={corPrimaria} /> : <FaRegCirclePlay color={corPrimaria} size={60} />}</button>
            <button className="m-2" onClick={() => onChangeVideo(videoSelecionado, "next")}><BiSkipNextCircle color={corPrimaria} size={45} /></button>
            <button className="m-2" onClick={() => setMore(!more)}><RiMoreFill size={25} color={corPrimaria} /></button>
            {more && (
              <div className={`buttonsMore`}>
                <button className="m-5" onClick={onChangeBotaoVolume}> 
                  {(volume * 100) > 50 ? <BiSolidVolumeFull style={{color: corPrimaria}} size={25} /> : volume != 0 ? <BiSolidVolumeLow style={{color: corPrimaria}} size={25} /> : <BiSolidVolume style={{color: corPrimaria}} size={25} />}
                </button>
                <button className="m-5" onClick={onChangeLoop}><TiArrowLoop color={loop ? corInversa : corPrimaria} size={30} /></button>
                <button className="m-5" onClick={onChangeFullScreen}><RiFullscreenFill color={corPrimaria} size={25} /></button>
                <button className="m-5" onClick={() => setSettings(!settings)}><IoMdSettings  color={corPrimaria} size={25} /></button>
              </div>
            )}
          </div>
        </section>
        {botaoVolume && (
          <section className="slider-volume">
            <Box sx={{ width: 200 }}>
              <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }} >
                <button onClick={() => {onChangeVolume(new Event(''), 0);}}>
                  {(volume * 100) > 50 ? <BiSolidVolumeFull style={{color: corPrimaria}} size={25} /> : volume != 0 ? <BiSolidVolumeLow style={{color: corPrimaria}} size={25} /> : <BiSolidVolume style={{color: corPrimaria}}  size={25} />}
                </button>
                <Slider aria-label="Volume" value={volume * 100} onChange={onChangeVolume} style={{color: corSecundaria}}/>
              </Stack>
            </Box>
          </section>
        )}
        {settings && (
          <section className={`flex flex-row justify-between m-5 ${styles.controles} p-10`}>
            <div className={`settings flex flex-column ${styles.settings}`}>
              <div className="setting-item">
                <Switch checked={pularIntro} onChange={handlePularIntro} />
                <label className={`${styles.label}`}>Pular Intro</label>
              </div>
              <div className="setting-item">
                <Switch checked={pularEncerramento} onChange={handlePularEncerramento} />
                <label className={`${styles.label}`}>Pular Encerramento</label>
              </div>
              <div className="setting-item">
                <Switch checked={controlesPlayer} onChange={handleControlePlayer} />
                <label className={`${styles.label}`}>Controles no Player</label>
              </div>
              <div className="setting-item">
                <Switch checked={darkMode} onChange={handleDarkMode} />
                <label className={`${styles.label}`}>Dark Mode</label>
              </div>
              {pularIntro &&
                <div className="setting-item">
                  <input className={`${styles.custom_number_input}`} value={duracaoIntro} onChange={(e) => onChangeDuracaoIntro(+e.target.value)} type="number"/>
                  <label className={`${styles.label}`} >Duração Intro</label>
                </div>
              }
              {pularEncerramento &&
                <div className="setting-item">
                  <input className={`${styles.custom_number_input}`} value={tempoEncerramento} onChange={(e) => onChangeTempoEncerramento(+e.target.value)} type="number"/>
                  <label className={`${styles.label}`} >Tempo Encerramento</label>
                </div>
              }
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
