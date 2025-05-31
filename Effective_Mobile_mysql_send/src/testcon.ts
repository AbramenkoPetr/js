import "reflect-metadata"
import { DataSource } from "typeorm"
import { Requests } from "./observation.entity"

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "userms",
    password: "1234",
    database: "db_requests",
    entities: [Requests],
    synchronize: true,
    logging: false,
})
console.log("testcon");
// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized successfully.");
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))