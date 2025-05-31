"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlDataSource = void 0;
const typeorm_1 = require("typeorm");
const observation_entity_1 = require("./observation.entity");
exports.MySqlDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "userms",
    password: "1234",
    database: "db_requests",
    timezone: 'Z',
    entities: [observation_entity_1.Requests],
    // synchronize: true,
    // logging: true,
    // subscribers: [],
    // migrations: [],
});
