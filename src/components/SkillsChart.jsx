import {
Radar,
RadarChart,
PolarGrid,
PolarAngleAxis,
PolarRadiusAxis,
ResponsiveContainer
} from "recharts"

const data = [
{ skill:"ML", value:85 },
{ skill:"Python", value:90 },
{ skill:"Computer Vision", value:80 },
{ skill:"Robotics", value:70 },
{ skill:"React", value:65 }
]

export default function SkillsChart(){

return(

<section id="skills">

<h2>Skills</h2>

<div style={{width:"100%",height:400}}>

<ResponsiveContainer>

<RadarChart data={data}>

<PolarGrid />

<PolarAngleAxis dataKey="skill" />

<PolarRadiusAxis />

<Radar
dataKey="value"
stroke="#38bdf8"
fill="#38bdf8"
fillOpacity={0.6}
/>

</RadarChart>

</ResponsiveContainer>

</div>

</section>

)

}