import { motion } from "framer-motion"
import ThreeScene from "./ThreeScene"
import { Typewriter } from "react-simple-typewriter"
import MagneticButton from "./MagneticButton"
import { useEffect } from "react"

export default function Hero(){

/* HERO PARALLAX SCROLL */

useEffect(()=>{

const moveHero = () => {

const scrolled = window.scrollY

const sphere = document.querySelector(".sphere-glow")

if(sphere){
sphere.style.transform = `translateY(${scrolled * 0.2}px)`
}

}

window.addEventListener("scroll", moveHero)

return () => window.removeEventListener("scroll", moveHero)

},[])



return(

<section
id="hero"
className="hero"
style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
alignItems:"center",
gap:"80px",
minHeight:"85vh"
}}
>

<div>

<motion.h1
className="gradient-name"
initial={{opacity:0,y:-40}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
>
Shreyas Jadhav
</motion.h1>

<motion.h2
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.5}}
>

<Typewriter
words={[
"AI / ML Developer",
"Computer Vision Enthusiast",
"Robotics Hobbyist"
]}
loop
cursor
typeSpeed={70}
deleteSpeed={40}
/>

</motion.h2>

<p>

Building intelligent systems using Machine Learning and Computer Vision.
Robotics and UAV development as hobby projects.

</p>

<br/>

<a href="#projects">
<MagneticButton>
View Projects
</MagneticButton>
</a>

</div>


<div>

<div style={{
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  width:"100%"
}}>

<div className="sphere-glow"></div>

<ThreeScene/>

</div>
</div>

</section>

)

}
