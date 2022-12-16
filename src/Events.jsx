import {AiOutlineCloseCircle} from "react-icons/ai"


function Events({title, time, venue, id, removeItem}) {
  return (
    <div className="event">
        <h4>{`${venue} - ${title} @${time} `}</h4><br/>
        <button onClick={() => removeItem(id)} className="close"><AiOutlineCloseCircle size={20}/></button>
    </div>
  )
}
export default Events