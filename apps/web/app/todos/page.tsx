"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Todo {
    task: string,
    done: boolean,
    userId: number
}

export default function () {
    const [todos, setTodos] = useState<Todo[]>([]);
    const taskRef = useRef<HTMLInputElement>(null);
    const userIdRef = useRef<HTMLInputElement>(null);

    async function addTodo() {
        const task = taskRef.current?.value || "";
        const userId = userIdRef.current?.value || "";
        console.log("Task: ", task)
        console.log("userId: ", userId)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create-todo`, {

            task: task,
            userId: userId

        })

        console.log("response: ", response.data)
        const todo = response.data.todo
        setTodos([...todos, {
            task: todo.task,
            done:todo.done,
            userId: todo.userId
        }])
    }

    useEffect(() => {
        async function getTodos() {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`);
            setTodos(response.data.todos);
        }
        getTodos();
    }, [])

    return <div className="flex gap-8">
        {todos.map((todo, index) => (
            <div key={index} className="p-4 rounded-md bg-gray-300">
                <div>Task: {todo.task}</div>
                <div>Done: {todo.done ? "True" : "False"}</div>
                <div>UserId: {todo.userId}</div>
            </div>
        ))}
        <br />
        <br />
        <div>
            <div>Create todo:</div>
            <label htmlFor=""> Task: </label>
            <input type="text" ref={taskRef} />
            <label htmlFor=""> UserId: </label>
            <input type="number" ref={userIdRef} />
            <button onClick={addTodo}>Create todo</button>
        </div>
    </div>
}