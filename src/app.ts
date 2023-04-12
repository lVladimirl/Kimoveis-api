import "reflect-metadata"
import "express-async-errors"
import express from "express"
import userRoutes from "./routes/users/user.routes"
import loginRoutes from "./routes/login/login.routes"


const app = express()
app.use(express.json())
app.use("/users", userRoutes);  
app.use("/login", loginRoutes);  


export default app