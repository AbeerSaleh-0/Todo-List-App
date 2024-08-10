import React, {useState} from "react"
import { TodoForm } from "./TodoForm"
import {v4 as uuidv4} from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoForm";
import toast, { Toaster } from "react-hot-toast";
uuidv4();
export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const addTodo = (todo) => {
        if (todo.trim() === "") {
            toast.error("Todo cannot be empty");
            return;
        }
        setTodos([...todos, {id: uuidv4(), task: todo,
            completed: false, isEditing: false
        },]);
    }
    const notify = () => {
        toast("Good Job!", 
            {icon: '👏',
            style: {
                borderRadius: '10px',
                background: '#00265a',
                color: '#fff',
              },});}

    const toggleComplete = (id) => {
        
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                if (!todo.completed) {
                    notify();
                }
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        }));
    }
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    const editTodo = (id) => {
        
        setTodos(todos.map((todo) => todo.id === id ? {
            ...todo, isEditing: !todo.isEditing} : todo
        ));
    }
    const editTask = (task, id) => {
        if (task.trim() === "") {
            toast.error("Todo cannot be empty");
            return;
        }
        setTodos(todos.map((todo) => todo.id === id ? {
            ...todo, task, isEditing: !todo.isEditing} : todo
    ))
    }
    return(
        <div className="TodoWrapper">
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo}/>
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} 
                    task={todo}/>
                ) : (
                     <Todo task={todo} key={index} 
                toggleComplete={toggleComplete} deleteTodo = {deleteTodo}
                editTodo={editTodo} />
                )
               
            ))}
            
        </div>
    )
}