import { useEffect } from "react"

export default function Cursor(){

useEffect(()=>{

const cursor = document.querySelector(".cursor")

document.addEventListener("mousemove",e=>{
cursor.style.left = e.clientX+"px"
cursor.style.top = e.clientY+"px"
})

},[])

return <div className="cursor"></div>

}