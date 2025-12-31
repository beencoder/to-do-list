import { useState, useCallback, useEffect } from "react";
import Date from "./Date";
import ListItem from "./ListItem";

const ToDoList = ({ nowTime }) => { 
  const [listTxt, setListTxt] = useState("");
  const [toDoList, setToDoList] = useState(() => {
    const saved = localStorage.getItem("my-todo-list");
    return saved ? JSON.parse(saved) : [];
  });
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    localStorage.setItem("my-todo-list", JSON.stringify(toDoList));
  }, [toDoList]);

  const insertToDo = (e) => {
    e.preventDefault();
    if (!listTxt.trim()) return alert("새로운 일정을 입력해주세요.");

    const newItem = {
      id: window.Date.now(),
      text: listTxt,
      checked: false
    };

    setToDoList(prev => [...prev, newItem]);
    setListTxt("");
  }

  const removeToDo = useCallback((id) => {
  if (window.confirm("일정을 삭제하시겠습니까?")) {
    setToDoList((prev) => prev.filter((item) => item.id !== id));
  }
}, []);

  const toggleCheck = (id) => {
    setToDoList(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const updateToDo = (e) => {
    e.preventDefault();
    if (!modalData.text.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    setToDoList(prev => prev.map(item => 
      item.id === modalData.id ? { ...item, text: modalData.text } : item
    ));
    setModalData(null);
  };

  return (
    <div className="listWrap">
      <form className="insertWrap" onSubmit={insertToDo}>
        <input 
          id="new-plan"
          className="insert" 
          value={listTxt} 
          onChange={(e) => setListTxt(e.target.value)} 
          placeholder="📝 새로운 일정 입력" 
        />
        <button className="insertBtn">+</button>
      </form>

      <Date nowTime={nowTime} />

      <ul className="itemWrap">
        {toDoList.map((item) => (
          <ListItem 
            key={item.id} 
            item={item} 
            onRemove={removeToDo} 
            onToggle={toggleCheck}
            onEdit={() => setModalData(item)}
          />
        ))}
      </ul>

      {/* 수정 모달 */}
      {modalData && (
        <div className="modal">
          <div className="modalOverlay" onClick={() => setModalData(null)}></div>

          <form className="updateWrap" onSubmit={updateToDo}>
            <strong className="modalTit">일정 수정</strong>

            <div className="inputGroup">
              <label htmlFor="editTodoInput" className="label">내용</label>
              <textarea 
                id="editTodoInput"
                className="content" 
                value={modalData.text} 
                onChange={(e) => setModalData({...modalData, text: e.target.value})}
                autoFocus
              />
            </div>

            <div className="btnWrap">
              <button className="btn" type="button" onClick={() => setModalData(null)}>취소</button>
              <button className="btn" type="submit">확인</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ToDoList;