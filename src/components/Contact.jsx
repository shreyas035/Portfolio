import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"
import { motion } from "framer-motion"

export default function Contact(){

return(

<motion.section
id="contact"
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
Contact
</motion.h2>

{/* TEXT */}
<motion.p
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
transition={{delay:0.2}}
viewport={{once:true}}
>
Feel free to reach out if you'd like to collaborate on AI/ML projects.
</motion.p>

{/* ICONS */}
<motion.div
className="contact-links"
initial={{opacity:0}}
whileInView={{opacity:1}}
transition={{delay:0.4}}
viewport={{once:true}}
>

<motion.a 
href="https://mail.google.com/mail/?view=cm&fs=1&to=shreyasj647@gmail.com"
whileHover={{scale:1.2}}
whileTap={{scale:0.9}}
title="Send Email"
>
<FaEnvelope/>
</motion.a>

<motion.a 
href="https://github.com/shreyas035"
target="_blank"
whileHover={{scale:1.2}}
whileTap={{scale:0.9}}
title="GitHub"
>
<FaGithub/>
</motion.a>

<motion.a 
href="https://www.linkedin.com/in/shreyas-jadhav-5969b0362"
target="_blank"
whileHover={{scale:1.2}}
whileTap={{scale:0.9}}
title="LinkedIn"
>
<FaLinkedin/>
</motion.a>

</motion.div>

</motion.section>

)
}