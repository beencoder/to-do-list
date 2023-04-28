import React, {useState} from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";

const ListItem = props => { 
  const { itemId, itemTxt, changeSelected, onInsertToggle, removeItem, checkedItemHandler } = props;
  const [checked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!checked);
    checkedItemHandler(target.id, target.checked);
  };

  return (
    <li className="item" id={itemId}>
      <div className="txtWrap">
        <input className="check" type="checkbox" id={itemId} checked={checked} onChange={(e) => checkHandler(e)} />
        <label htmlFor={itemId}></label>
        <p className="itemTxt">{itemTxt}</p>
      </div>
      <div className="btnWrap">
        <button className="btn" onClick={() => {
          changeSelected({id: itemId, text: itemTxt}); onInsertToggle();}}>
          <FaPen size="16" color="#454D52" />
        </button>
        <button className="btn" onClick={() => removeItem(itemId)}><FaTrashAlt size="16" color="#454D52" /></button>
      </div>
    </li>
  )
}

export default ListItem;