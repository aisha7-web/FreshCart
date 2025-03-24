import React from 'react'
import style from "./Home.module.css"
import RecentProducts from '../RecentProducts/RecentProducts'
import HomeSlider from '../HomeSlider/HomeSlider'
import MainSlider from '../MainSlider/MainSlider'


export default function Home() {
  return (
    <>
    <MainSlider/>
    <HomeSlider/>
    <RecentProducts/>
    </>
  )
}
