import { useState, useEffect } from 'react';
import Navbar from './component/Navbar';
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from local storage when the component mounts
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.find(i => i.id === id);
    setTodo(t.todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-indigo-500 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>Itask- Manage todos at one place</h1>
        <div className="addTodo my-5 flex-col gap-4">
          <h2 className='text-2lg font-bold'>Add your todo</h2>
          <div className="button">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-indigo-600 hover:bg-indigo-800 disabled:bg-violet-400 mt-2 px-2 py-1 text-sm text-white rounded-md font-semibold w-full hover:cursor-pointer'>Save Todo</button>
          </div>
        </div>

        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <hr />
        <h2 className='text-lg font-bold'>YOUR TODO</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item => (
            (showFinished || item.isCompleted) && <div key={item.id} className="todo flex space justify-between my-3">
              <div className='flex gap-3'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={() => handleEdit(item.id)} className='bg-lime-500 hover:bg-lime-800 px-2 py-1 text-sm text-white rounded-md font-semibold mx-1'><MdEdit /></button>
                <button onClick={() => handleDelete(item.id)} className='bg-lime-500 hover:bg-lime-800 px-2 py-1 text-sm text-white rounded-md font-semibold mx-1'><MdDeleteOutline /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
