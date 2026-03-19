import { motion } from "framer-motion"

export default function Timeline(){

const data = [

{
year:"2023",
title:"Started Computer Engineering",
desc:"B.E. in Computer Engineering under Savitribai Phule Pune University."
},

{
year:"2024",
title:"Focused on AI / ML",
desc:"Currently pursuing Artificial Intelligence and Machine Learning as my primary field of study with focus on Computer Vision."
},

{
year:"2025",
title:"AI Systems & Robotics Projects",
desc:"Developing intelligent systems using Python, OpenCV, and deep learning while exploring robotics and UAV technologies."
}

]

return(

<motion.section
id="timeline"
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
Journey
</motion.h2>

<motion.div
className="timeline"
initial="hidden"
whileInView="visible"
viewport={{once:true}}
variants={{
hidden:{opacity:0},
visible:{
opacity:1,
transition:{staggerChildren:0.3}
}
}}
>

{data.map((item,index)=>(

<motion.div
key={index}
className="timeline-item"
variants={{
hidden:{opacity:0, x:-50},
visible:{opacity:1, x:0}
}}
whileHover={{scale:1.03}}
transition={{duration:0.5}}
>

<h3>{item.year}</h3>
<h4>{item.title}</h4>
<p>{item.desc}</p>

</motion.div>

))}

</motion.div>

</motion.section>

)
}