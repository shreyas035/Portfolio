import { useEffect, useState } from "react"

export default function ScrollProgress(){

const [scroll,setScroll] = useState(0)

useEffect(()=>{

const handleScroll = () => {

const totalHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight

const progress =
(window.scrollY / totalHeight) * 100

setScroll(progress)

}

window.addEventListener("scroll",handleScroll)

return () => window.removeEventListener("scroll",handleScroll)

},[])

return(

<div
className="scroll-bar"
style={{width:`${scroll}%`}}
></div>

)

}