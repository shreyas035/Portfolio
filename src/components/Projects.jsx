const handleMouseMove = (e, card) => {
const rect = card.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const centerX = rect.width / 2
const centerY = rect.height / 2

const rotateX = -(y - centerY) / 20
const rotateY = (x - centerX) / 20

card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

const resetTilt = (card) => {
card.style.transform = "rotateX(0) rotateY(0)"
}

import { motion } from "framer-motion"

export default function Projects(){

return(

<section id="projects">

<motion.h2
initial={{opacity:0, y:50}}
whileInView={{opacity:1, y:0}}
transition={{duration:0.6}}
viewport={{once:true}}
>
Projects
</motion.h2>

<motion.div 
className="projects-grid"
initial={{opacity:0}}
whileInView={{opacity:1}}
transition={{delay:0.2}}
viewport={{once:true}}
>

{/* PROJECT 1 */}
<motion.div
className="project-card"
onMouseMove={(e)=>handleMouseMove(e,e.currentTarget)}
onMouseLeave={(e)=>resetTilt(e.currentTarget)}
initial={{opacity:0, y:40}}
whileInView={{opacity:1, y:0}}
transition={{duration:0.5}}
viewport={{once:true}}
>
<img src="/project1.jpg" />

<div className="project-overlay">
<h3>Accident Detection</h3>
<p>AI system detecting road accidents</p>

<div className="project-buttons">
<a href="https://github.com/shreyas035/Accident-Detection-System.git" target="_blank">
<button>Code</button>
</a>
</div>

</div>
</motion.div>


{/* PROJECT 2 */}
<motion.div
className="project-card"
onMouseMove={(e)=>handleMouseMove(e,e.currentTarget)}
onMouseLeave={(e)=>resetTilt(e.currentTarget)}
initial={{opacity:0, y:40}}
whileInView={{opacity:1, y:0}}
transition={{duration:0.5, delay:0.2}}
viewport={{once:true}}
>
<img src="/project2.jpg" />

<div className="project-overlay">
<h3>Hand Face Tracking</h3>
<p>Real-time tracking using OpenCV</p>

<div className="project-buttons">
<a href="https://github.com/shreyas035/Hand-Face-Tracking-using-python.git" target="_blank">
<button>Code</button>
</a>
</div>

</div>
</motion.div>


{/* PROJECT 3 */}
<motion.div
className="project-card"
onMouseMove={(e)=>handleMouseMove(e,e.currentTarget)}
onMouseLeave={(e)=>resetTilt(e.currentTarget)}
initial={{opacity:0, y:40}}
whileInView={{opacity:1, y:0}}
transition={{duration:0.5, delay:0.4}}
viewport={{once:true}}
>
<img src="/project3.jpg" />

<div className="project-overlay">
<h3>Object Detection</h3>
<p>YOLO-based detection system</p>

<div className="project-buttons">
<a href="https://github.com/shreyas035/Object-Detection-Using-Python.git" target="_blank">
<button>Code</button>
</a>
</div>

</div>
</motion.div>


{/* 🚀 PROJECT 4 - AI CAREER COACH */}
<motion.div
className="project-card"
onMouseMove={(e)=>handleMouseMove(e,e.currentTarget)}
onMouseLeave={(e)=>resetTilt(e.currentTarget)}
initial={{opacity:0, y:40}}
whileInView={{opacity:1, y:0}}
transition={{duration:0.5, delay:0.6}}
viewport={{once:true}}
>
<img src="/project4.jpg" />

{/* 🔥 BADGE */}
<div className="dev-badge">under development</div>

<div className="project-overlay">

<h3>AI Career Coach</h3>

<p>
AI-powered platform for resume building, interview preparation, and career guidance.
Provides personalized suggestions using intelligent models and real-time assistance.
</p>

</div>

</motion.div>

</motion.div>

</section>

)
}