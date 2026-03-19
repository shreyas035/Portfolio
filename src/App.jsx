import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Robotics from "./components/Robotics"
import Skills from "./components/Skills"
import Contact from "./components/Contact"
import ParticlesBackground from "./components/ParticlesBackground"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import Timeline from "./components/Timeline"
import ScrollProgress from "./components/ScrollProgress"
import SkillsChart from "./components/SkillsChart"
import RoboticsShowcase from "./components/RoboticsShowcase"
import FloatingIcons from "./components/FloatingIcons"
import Cursor from "./components/Cursor"
import Stats from "./components/Stats"   // ✅ FIX ADDED
import MobileNav from "./components/MobileNav"
import FloatingCTA from "./components/FloatingCTA"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"   // ✅ FOR PAGE TRANSITION


function App(){

const [loading,setLoading] = useState(true)

/* LOADER TIMER */
useEffect(()=>{

const timer = setTimeout(()=>{
setLoading(false)
},2200)   // slightly longer for smooth finish

return () => clearTimeout(timer)

},[])

/* CURSOR GLOW EFFECT */
useEffect(()=>{
const move = (e) => {
document.body.style.setProperty("--x", e.clientX + "px")
document.body.style.setProperty("--y", e.clientY + "px")
}
window.addEventListener("mousemove", move)
return () => window.removeEventListener("mousemove", move)
},[])

/* SHOW LOADER FIRST */
if(loading){
return <Loader/>
}

return(

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
transition={{duration:0.6}}
>

<Cursor/>   

<ParticlesBackground/>
<FloatingIcons/>

<ScrollProgress/>

<Navbar/>

<Hero/>
<Stats/>   {/* ✅ NOW WORKS */}

<About/>
<Projects/>
<Timeline/>

<RoboticsShowcase/>
<Robotics/>

<SkillsChart/>
<Contact/>

<Footer/>
<MobileNav/>
<FloatingCTA/>
</motion.div>

)

}

export default App