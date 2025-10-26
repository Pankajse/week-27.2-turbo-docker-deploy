import prisma from "@repo/db/client";
import express from "express";

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
    prisma.user.findMany()
        .then((users: any) => {
            res.json(users);
        })
        .catch((err: Error) => {
            res.status(500).json({ error: err.message });
        });
})

app.post("/user", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ error: "Username and password are required" });
        return
    }

    prisma.user.create({
        data: {
            username,
            password
        }
    })
        .then((user: any) => {
            res.status(201).json(user);
        })
        .catch((err: Error) => {
            res.status(500).json({ error: err.message });
        });
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});