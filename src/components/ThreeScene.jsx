import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"

function Sphere(){

  const mesh = useRef()

  useFrame(({ mouse }) => {

    if(mesh.current){
      mesh.current.rotation.y += 0.004
      mesh.current.rotation.x = mouse.y * 0.4
      mesh.current.rotation.z = mouse.x * 0.4
    }

  })

  return(
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh}>
        <sphereGeometry args={[2, 28, 28]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  )
}

export default function ThreeScene(){

  const [isMobile, setIsMobile] = useState(null) // 👈 IMPORTANT

  useEffect(()=>{
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  },[])

  // ⛔ WAIT until screen size is known
  if(isMobile === null) return null

  // 📱 MOBILE
  if(isMobile){
    return(
      <div style={{
        height:"200px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>
        <div style={{
          width:"140px",
          height:"140px",
          borderRadius:"50%",
          background:"radial-gradient(circle, #38bdf8, transparent 70%)",
          boxShadow:"0 0 70px rgba(56,189,248,0.6)"
        }}></div>
      </div>
    )
  }

  // 💻 DESKTOP
  return(
    <Canvas camera={{ position:[0,0,5] }} style={{height:"420px"}}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3,3,3]} intensity={1.2} />
      <Sphere/>
    </Canvas>
  )

}