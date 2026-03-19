import { motion } from "framer-motion"

export default function Stats(){

const stats = [
{label:"Projects", value:"10+"},
{label:"Technologies", value:"15+"},
{label:"Coding Experience", value:"2+ Years"},
{label:"Industry Experience", value:"5+ Months"}
]

return(

<section id="stats">

<motion.h2
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
>
Stats
</motion.h2>

<div className="grid">

{stats.map((s,i)=>(

<motion.div
key={i}
className="card"
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{delay:i*0.2}}
viewport={{once:true}}
>

<h1>{s.value}</h1>
<p>{s.label}</p>

</motion.div>

))}

</div>

</section>

)

}