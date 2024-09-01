'use client'

import { useContext, useState } from "react";
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { HomeContext } from "./context/HomeContext";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCirclePause } from "react-icons/fa6";

export default function Home() {
  const {
    contador,
    incremento,
    playing,
    onChangePlay
  } = useContext(HomeContext);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{contador}</h1>
      <h1>{playing ? "Pause" : "Executando"}</h1>
      <div className="flex flex-row">
        <button onClick={() => onChangePlay()}>
          {playing ? <FaRegCirclePlay style={{ fontSize: '3em' }} /> : <FaRegCirclePause style={{ fontSize: '3em' }} />}
        </button>
        <button onClick={() => incremento()}>
          {
            (contador === 0) ?
              (<FaPlusCircle className="text-[50px] text-[tomato]" />) :
              (<FaMinusCircle />)
          }

        </button>
        <button onClick={() => incremento()}>
          {
            (contador === 0) ?
              (<FaPlusCircle className="text-[50px] text-[tomato]" />) :
              (<FaMinusCircle />)
          }

        </button>
        <button onClick={() => incremento()}>
          {
            (contador === 0) ?
              (<FaPlusCircle className="text-[50px] text-[tomato]" />) :
              (<FaMinusCircle />)
          }
        </button>
      </div>
    </main>
  );
}
