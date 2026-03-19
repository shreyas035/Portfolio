import { useState, useEffect } from "react"

export default function Loader(){

const [progress,setProgress] = useState(0)

useEffect(()=>{

let interval = setInterval(()=>{

setProgress(prev=>{
if(prev >= 100){
clearInterval(interval)
return 100
}
return prev + 1
})

},15)

return () => clearInterval(interval)

},[])

return(

<div className="loader-container">

<div className="loader-box">

<p className="loader-title">Loading Portfolio</p>

<p className="loader-percent">{progress}%</p>

<div className="loader-bar">
<div 
className="loader-fill" 
style={{width: progress + "%"}}
></div>
</div>

</div>

</div>

)

}