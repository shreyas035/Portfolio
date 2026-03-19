import { FaHome, FaUser, FaProjectDiagram, FaCode, FaEnvelope } from "react-icons/fa"

export default function MobileNav(){

return(

<div className="mobile-nav">

<a href="#hero"><FaHome/></a>
<a href="#about"><FaUser/></a>
<a href="#projects"><FaProjectDiagram/></a>
<a href="#skills"><FaCode/></a>
<a href="#contact"><FaEnvelope/></a>

</div>

)

}