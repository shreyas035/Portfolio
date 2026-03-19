import { motion } from "framer-motion"

export default function About(){

return(

<motion.section
id="about"
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
About Me
</motion.h2>

{/* PARAGRAPH 1 */}
<motion.p
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
transition={{delay:0.2}}
viewport={{once:true}}
>
I am an AI and Machine Learning Engineer focused on building intelligent systems that can see, interpret, and understand the world. My work centers on Computer Vision and data-driven modeling, where I manage the entire lifecycle—from processing raw datasets to training and deploying smart, reliable AI solutions. I’m driven by the goal of making complex algorithms both efficient and impactful in real-world scenarios.
</motion.p>

{/* PARAGRAPH 2 */}
<motion.p
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
transition={{delay:0.4}}
viewport={{once:true}}
>
Beyond my core AI projects, I have a dedicated interest in Robotics and UAVs. I enjoy the unique challenge of taking these advanced models and integrating them with actual hardware. For me, there is nothing more rewarding than turning a digital architecture into a functional, autonomous machine that can navigate and interact with its environment.
</motion.p>

</motion.section>

)

}