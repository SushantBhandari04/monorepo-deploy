import express from "express"
const app = express();
import { prisma } from "@repo/db/prisma"
import cors from "cors";

app.use(express.json());
app.use(cors());

app.get("/get-users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json({
        users,
        message: "Get endpoint!!"
    })
})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body
    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    })

    res.json({
        user,
        message: "User created successfully"
    })
})

app.post("/create-todo", async (req, res) => {
    const { task, userId } = await req.body
    console.log("Task: ", task)
    console.log("userId: ", userId)
    const todo = await prisma.todo.create({
        data: {
            task,
            userId: Number(userId)
        }
    })

    res.json({
        todo,
        message: "Todo created successfully"
    })
})
app.get("/todos", async (req, res) => {
    const todos = await prisma.todo.findMany();

    res.json({
        todos
    })
})

app.listen(3001, () => {
    console.log("Listening on port 3001");
})