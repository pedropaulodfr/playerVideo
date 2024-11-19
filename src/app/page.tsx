"use client";

import { useContext, useState } from "react";
import { HomeContext } from "./context/HomeContext";
import { FaRegCirclePlay, FaRegCirclePause } from "react-icons/fa6";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { RiFullscreenFill, RiMoreFill  } from "react-icons/ri";
import { TiArrowLoop } from "react-icons/ti";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeMute from "@mui/icons-material/VolumeMute";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Sidebar from '../components/Sidebar';
import PlayerVideo from "@/components/PlayerVideo";
import styles from '@/components/PlayerVideo.module.css'


export default function Home() {
  const { videoSelecionado, onChangeVideo, play, onChangePlay, volume, onChangeVolume, botaoVolume, 
    onChangeBotaoVolume, onChangeFullScreen, loop, onChangeLoop } = useContext(HomeContext);
  const [more, setMore] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div style={{zIndex: 9999}}><Sidebar/></div>

      <div className="flex flex-col justify-center items-center">
        <section className="info-music">
          <div className="cover-music"  style={{width: "80vw"}}>
            <PlayerVideo videoSrc={videoSelecionado.urlVideo} mute={false} volume={volume} />
          </div>
          <div className="description-music">
            <h1 style={{fontSize: "1.3em", fontWeight: "bold"}}>{videoSelecionado.name}</h1>
            <h2 style={{fontSize: "1em", fontWeight: "normal"}}>{videoSelecionado.author}</h2>
          </div>
        </section>

        <section className="flex flex-row justify-between">
          <div className={`controles flex flex-row ${styles.controles}`}>
            <button className="m-2" onClick={() => onChangeVideo(videoSelecionado, "prev")}><BiSkipPreviousCircle size={45} /></button>
            <button className="m-2" onClick={() => onChangePlay()}>{play ? <FaRegCirclePause size={60} /> : <FaRegCirclePlay size={60} />}</button>
            <button className="m-2" onClick={() => onChangeVideo(videoSelecionado, "next")}><BiSkipNextCircle size={45} /></button>
            <button className="m-2" onClick={() => setMore(!more)}><RiMoreFill size={25} color="#333" /></button>
            {more && (
              <>
                <button className="m-5" onClick={onChangeBotaoVolume}> 
                  {(volume * 100) > 50 ? <VolumeUp style={{color: "#333"}} /> : volume != 0 ? <VolumeDown style={{color: "#333"}} /> : <VolumeMute style={{color: "#333"}} />}
                </button>
                <button onClick={onChangeLoop}><TiArrowLoop color={loop ? "#000" : "#333"} size={30} /></button>
                <button className="m-5" onClick={onChangeFullScreen}><RiFullscreenFill color="#333" size={25} /></button>
              </>
            )}
            {botaoVolume && (
          <section className="slider-volume">
            <Box sx={{ width: 200 }}>
              <Stack spacing={2} direction="row" sx={{ alignItems: "center", mb: 1 }} >
                <button onClick={() => {onChangeVolume(new Event(''), 0);}}>
                  {(volume * 100) > 50 ? <VolumeUp /> : volume != 0 ? <VolumeDown /> : <VolumeMute />}
                </button>
                <Slider aria-label="Volume" value={volume * 100} onChange={onChangeVolume} style={{color: '#333333'}}/>
              </Stack>
            </Box>
          </section>
        )}
          </div>
        </section>

        
      </div>
    </main>
  );
}
