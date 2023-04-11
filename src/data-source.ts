import { DataSource } from "typeorm"
import path from "path"
import "dotenv/config"

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test" ?
    {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/*.ts"]
    } :
    {
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        logging: true,
        synchronize: false,
        entities: [path.join(__dirname, "./entities/**.{js,ts}")],
        migrations: [path.join(__dirname, "./migrations/**.{js,ts}")]
    }
)

export default AppDataSource