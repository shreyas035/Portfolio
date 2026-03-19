import { useState, useEffect } from "react"

export default function ThemeToggle(){

const [dark,setDark] = useState(true)

useEffect(()=>{
if(dark){
document.body.classList.remove("light")
}else{
document.body.classList.add("light")
}
},[dark])

return(
<button 
className="theme-btn"
onClick={()=>setDark(!dark)}
>
{dark ? "🌙" : "☀"}
</button>
)

}