import { motion } from "framer-motion"
export default function Robotics(){

return(

<motion.section
id="about"
initial={{opacity:0,y:60}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.6}}
viewport={{once:true}}
>

<h2>Robotics (Hobby Projects)</h2>

<div className="grid">

<div className="card">

<h3>Line Following Robot</h3>

<p>

PID based autonomous robot built using Arduino and sensor array.

</p>

</div>


<div className="card">

<h3>UAV Drone Research</h3>

<p>

Research on endurance optimized UAV design and aerodynamics.

</p>

</div>

</div>

</motion.section>

)

}