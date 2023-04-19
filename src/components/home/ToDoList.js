import React, {useState, useRef, useCallback} from "react";

const ToDoList = props => { 
  const nextId = useRef(1);
  const [listTxt, setListTxt] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const insertToDo = useCallback(e => {
    // const list = [];
    const toDoObj = {
      id: nextId.current,
      text: listTxt
    };

    e.preventDefault();
    setToDoList((list) => list.concat(toDoObj));
    nextId.current++;
  }, [listTxt])

  const onChangeTxt = (e) => {
    setListTxt(e.target.value);
  }

  return (
    <>
      <form className="js_form form">
        <input className="name_input" type="text" placeholder="&#10024; What is your name?" />
        <button>입력</button>
      </form>
      <form className="js_todoForm" onSubmit={insertToDo}>
        <input type="text" defaultValue={listTxt} onChange={onChangeTxt} placeholder=" &#128221; Write down what to do" />
        <button type="submit">입력</button>
      </form>
      <ul className="js_toDoList">
      {toDoList &&
          toDoList.map((item, i) => (
            <li key={i}>{item.text}</li>
            )
          )
      }
        </ul>
    </>
  )
}

export default ToDoList;