import "reflect-metadata"
import "express-async-errors"
import express from "express"
import userRoutes from "./routes/users/user.routes"


const app = express()
app.use(express.json())
app.use("/users", userRoutes);  


export default app