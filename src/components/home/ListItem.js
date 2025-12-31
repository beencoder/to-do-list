import { FaTrashAlt, FaPen } from "react-icons/fa";

const ListItem = ({ item, onRemove, onToggle, onEdit }) => { 
  const { id, text, checked } = item;

  return (
    <li className="item">
      <div className="txtWrap">
        <input 
          className="check" 
          type="checkbox" 
          id={`todo-${id}`} 
          checked={checked} 
          onChange={() => onToggle(id)}
        />
        <label htmlFor={`todo-${id}`}></label>
        
        <p className={`itemTxt ${checked ? 'completed' : ''}`}>
          {text}
        </p>
      </div>

      <div className="btnWrap">
        <button className="btn" onClick={onEdit}>
          <FaPen size="16" color="#454D52" />
        </button>
        
        <button className="btn" onClick={() => onRemove(id)}>
          <FaTrashAlt size="16" color="#454D52" />
        </button>
      </div>
    </li>
  )
}

export default ListItem;