import React, { useState, useRef, useCallback } from "react";
import Date from "./Date";
import ListItem from "./ListItem";

const ToDoList = props => { 
  const { dateBuilder, nowDate, nowTime } = props;
  const nextId = useRef(1);
  const [listTxt, setListTxt] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [selectedToDo, setSelectedToDo] = useState({id: 0, text: ""});
  const [insertToggle, setInsertToggle] = useState(false);
  const [editListTxt, setEditListTxt] = useState("");
  const [checkedItems, setCheckedItems] = useState(new Set());

  const insertToDo = useCallback(e => {
    e.preventDefault();
    const toDoObj = {
      id: nextId.current,
      text: listTxt
    };

    if (listTxt === "") {
      alert("새로운 일정을 입력해주세요.");
      return;
    }

    setToDoList((list) => list.concat(toDoObj));
    nextId.current++;
    setListTxt("");
  }, [listTxt])

  const removeToDo = useCallback(id => {
    if (!window.confirm("일정을 삭제하시겠습니까?")) return
    else setToDoList((list) => list.filter((i) => i.id !== id));
  }, [])

  const onInsertToggle = useCallback(() => {
    setInsertToggle((prev) => !prev);
  }, []);

  const changeSelectedToDo = (todo) => {
    setSelectedToDo(todo);
    setEditListTxt(todo.text);
  };

  const updateToDo = useCallback((id, txt) => {
    onInsertToggle();
    setToDoList((list) => list.map((i) => (i.id === id ? { ...i, text: txt } : i)));
  }, [onInsertToggle])

  const onUpdateToDo = useCallback(e => {
    e.preventDefault();

    if (!window.confirm("일정을 수정하시겠습니까?")) return
    else {
      updateToDo(selectedToDo.id, editListTxt);
      setEditListTxt("");
    }
  }, [editListTxt, selectedToDo, updateToDo])

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };

  return (
    <div className="listWrap">
      <form className="insertWrap" onSubmit={insertToDo}>
        <input className="insert" type="text" value={listTxt} onChange={(e) => setListTxt(e.target.value)} placeholder="&#128221; 새로운 일정 입력" />
        <button className="insertBtn" type="submit">+</button>
      </form>

      <Date dateBuilder={dateBuilder} nowDate={nowDate} nowTime={nowTime} />

      <ul className="itemWrap">
        {toDoList.map((item, i) => (
          <ListItem key={i} itemId={ item.id } itemTxt={ item.text } changeSelected={changeSelectedToDo} onInsertToggle={onInsertToggle} removeItem={removeToDo} checkedItemHandler={checkedItemHandler} />
        ))}
      </ul>

      {insertToggle && (
        <div className="modal">
          <form className="updateWrap" onSubmit={onUpdateToDo}>
            <strong className="modalTit">일정 수정</strong>
            <input className="update" type="text" value={editListTxt} onChange={(e) => setEditListTxt(e.target.value)} />
            <div className="btnWrap">
              <button className="btn" onClick={() => setInsertToggle(false)}>취소</button>
              <button className="btn" type="submit">확인</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ToDoList;