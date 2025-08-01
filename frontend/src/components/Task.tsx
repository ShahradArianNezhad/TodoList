import { useState } from "react"

type Props = {
    date:string,
    task:string,
    done:boolean,
}

const Task = (props: Props) => {

    const [done,setDone] = useState(false)



  return (
    <div>
        <p>{props.task}</p>
        <input type="checkbox" name="done" id="done" checked={done} onClick={()=>{setDone(!done)}}/>
        <button>edit</button>
        <p>{props.date}</p>
    </div>
  )
}

export default Task