import { useEffect } from "react"
import { useState } from "react"


export default function Home(){

    useEffect(()=>{
       fetch('http://localhost:5000/api/rooms')
       .then(res => res.json())
       .then(data => console.log(data))
    },[])
    return(
        <>
        <div>
              home
        </div>
     
        </>
    )
}