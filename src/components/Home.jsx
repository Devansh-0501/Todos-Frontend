import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../styles/home.css'
import CreateList from './CreateList'
import ShowList from './ShowList'

const Home = () => {
  

  return (
    <div className='home'>
        
        <CreateList />
        <ShowList />
       
       
    </div>
  )
}

export default Home