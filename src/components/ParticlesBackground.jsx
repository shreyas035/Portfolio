import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

export default function ParticlesBackground() {

const particlesInit = useCallback(async (engine) => {
await loadSlim(engine)
}, [])

return (

<Particles

id="tsparticles"
init={particlesInit}

options={{

fullScreen: {
enable: true,
zIndex: -1
},

background: {
color: {
value: "transparent"
}
},

particles: {

number: {
value: 60
},

color: {
value: "#38bdf8"
},

links: {
enable: true,
distance: 150,
color: "#38bdf8",
opacity: 0.4
},

move: {
enable: true,
speed: 1
},

size: {
value: { min: 1, max: 3 }
},

opacity: {
value: 0.5
}

}

}}

 />

)

}