"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const observation_entity_1 = require("./observation.entity");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "userms",
    password: "1234",
    database: "db_requests",
    entities: [observation_entity_1.Requests],
    synchronize: true,
    logging: false,
});
console.log("testcon");
// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized successfully.");
    // here you can start to work with your database
})
    .catch((error) => console.log(error));
