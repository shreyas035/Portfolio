import { useState } from "react"

export default function Navbar(){

const [menuOpen,setMenuOpen] = useState(false)

return(

<div className="navbar">

<div className="logo">SJ</div>

{/* TOGGLE */}
<div className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)}>
☰
</div>

{/* LINKS */}
<div className={`nav-links ${menuOpen ? "active" : ""}`}>

<a href="#hero" onClick={()=>setMenuOpen(false)}>Home</a>
<a href="#about" onClick={()=>setMenuOpen(false)}>About</a>
<a href="#projects" onClick={()=>setMenuOpen(false)}>Projects</a>
<a href="#skills" onClick={()=>setMenuOpen(false)}>Skills</a>
<a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a>

</div>

{/* RESUME */}
<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-btn" download>
Resume
</a>
</div>

)

}