import { motion } from "framer-motion"

export default function Skills(){

return(

<motion.section
id="skills"
initial={{opacity:0,y:60}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.6}}
viewport={{once:true}}
>

{/* TITLE */}
<motion.h2
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
transition={{delay:0.1}}
viewport={{once:true}}
>
Skills
</motion.h2>

<motion.div
className="grid"
initial="hidden"
whileInView="visible"
viewport={{once:true}}
variants={{
hidden:{opacity:0},
visible:{
opacity:1,
transition:{staggerChildren:0.2}
}
}}
>

{/* AI / ML */}
<motion.div
className="card"
variants={{
hidden:{opacity:0,y:40},
visible:{opacity:1,y:0}
}}
>

<h3>AI / ML</h3>

{[
["Python","90%"],
["TensorFlow","80%"],
["PyTorch","75%"],
["OpenCV","85%"],
["YOLO","80%"]
].map(([name,value],i)=>(
<div className="skill" key={i}>

<p>{name}</p>

<div className="bar">
<motion.div 
className="progress"
initial={{width:0}}
whileInView={{width:value}}
transition={{duration:1, delay:i*0.2}}
viewport={{once:true}}
></motion.div>
</div>

</div>
))}

</motion.div>


{/* ROBOTICS */}
<motion.div
className="card"
variants={{
hidden:{opacity:0,y:40},
visible:{opacity:1,y:0}
}}
>

<h3>Robotics</h3>

{[
["Arduino","80%"],
["ESP32","70%"],
["Sensors","75%"],
["Drone Systems","65%"]
].map(([name,value],i)=>(
<div className="skill" key={i}>

<p>{name}</p>

<div className="bar">
<motion.div 
className="progress"
initial={{width:0}}
whileInView={{width:value}}
transition={{duration:1, delay:i*0.2}}
viewport={{once:true}}
></motion.div>
</div>

</div>
))}

</motion.div>

</motion.div>

</motion.section>

)
}