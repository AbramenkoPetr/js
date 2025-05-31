"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const MsqlDataSource_1 = require("./MsqlDataSource");
const observation_entity_1 = require("./observation.entity");
const express_1 = __importDefault(require("express"));
var mysql = require('mysql2');
// const connection = /*await*/ createConnection({ 
// });
// await connection.initialize()
//   .then(async connection => {})
// console.log("connection ", connection );
// var con_data = mysql.createConnection({
//     host: "localhost",
//     port: "3306",
//    user: "userms",
//    password: "1234",
//    database: "db_requests"
// })
// createConnection({
//   type: "mysql",
//   host: "localhost",
//   port: "3306",
//   username: "userms",
//   password: "1234",
//   database: "db_requests",
//   entities: [Requests],
//   synchronize: true,
//   logging: true,
//   subscribers: [],
//   migrations: [],
// })
//   .then
// con_data.connect (function (err) {
//   if (err) {
//       console.log('ошибка подключения');
//       throw err;
//   }
//   console.log("Connected!");
// })
const repository = typeorm_1.Repository;
//console.log("MySqlDataSource ", {MySqlDataSource} );
const app = (0, express_1.default)();
const PORT = 3000;
var ithem1;
var date_end;
var date_start;
app.use(express_1.default.json()); // Готов принять JSON
(() => __awaiter(void 0, void 0, void 0, function* () {
    //const initial = MySqlDataSource.initialize(); 
    //console.log("initial ", initial );
    yield MsqlDataSource_1.MySqlDataSource.initialize()
        .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Data Source has been initialized successfully.");
        app.get("/", function (req, res) {
            console.log("Something was catched!" + req.method, __dirname);
            res.sendFile('/index.html', { root: __dirname });
        });
        //Создать обращение
        app.post('/create-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            // Теперь в req.body – данные от клиента
            const req_body = req.body;
            // console.log(req.body);
            const sampleItem = new observation_entity_1.Requests();
            sampleItem.request = req_body.request;
            sampleItem.status = req_body.status;
            sampleItem.theme = req_body.theme;
            sampleItem.reason_for_cancellation = "";
            sampleItem.reply = "";
            yield connection.manager.save(sampleItem);
            res.setHeader('Content-Type', 'application/json').json(sampleItem);
        }));
        //Список всех обращений
        app.get('/list-of-requests', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            ithem1 = yield connection
                .getRepository(observation_entity_1.Requests)
                .createQueryBuilder("requests")
                .getMany();
            console.log(ithem1);
            res.setHeader('Content-Type', 'application/json').json(ithem1);
            return;
        }));
        //список обращенй фильтр по дате
        app.post('/list-of-requests', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            // Теперь в req.body – данные от клиента
            const req_body = req.body;
            var ds, ms, ys, de, me, ye;
            console.log(req_body);
            if (req_body.ys != undefined && req_body.ys != '') {
                ds = req_body.ds;
                ms = req_body.ms;
                ys = req_body.ys;
                if ((ds == undefined || ms == undefined || ys == undefined) || (ds == '' || ms == '' || ys == ''))
                    ds = ms = ys = '';
                date_start = ys + "-" + ms + "-" + ds;
                const sd = new Date(date_start);
                console.log(ds, ms, ys, sd);
            }
            if ((req_body.ye != undefined) && (req_body.ye != '')) {
                de = String(Number(req_body.de) + 1);
                me = req_body.me;
                ye = req_body.ye;
                console.log('do if', de, me, ye);
                if ((de == undefined || me == undefined || ye == undefined) || (de == '' || me == '' || ye == ''))
                    de = me = ye = undefined;
                date_end = ye + "-" + me + "-" + de;
                const se = new Date(date_end);
                console.log(de, me, ye, se);
            }
            else {
                const de = String(Number(req_body.ds) + 1);
                const me = req_body.ms;
                const ye = req_body.ys;
                date_end = ye + "-" + me + "-" + de;
                const se = new Date(date_end);
                console.log(de, me, ye, se);
            }
            if (ys == '') { }
            if (ys == undefined || ys == '') {
                //console.log('все', req_body);
                ithem1 = yield connection
                    .getRepository(observation_entity_1.Requests)
                    .createQueryBuilder("requests")
                    .getMany();
                //console.log(ithem1);
                res.setHeader('Content-Type', 'application/json').json(ithem1);
            }
            if (ys != undefined && ys != '') {
                //console.log('диапазон', req_body);
                ithem1 = yield connection
                    .createQueryBuilder()
                    .select("requests")
                    .from(observation_entity_1.Requests, "requests")
                    .where(`requests.date > :startDate`, { startDate: new Date(date_start) })
                    .andWhere(`requests.date < :endDate`, { endDate: new Date(date_end) })
                    .getMany();
                //console.log(ithem1);
                {
                    res.setHeader('Content-Type', 'application/json').json(ithem1);
                }
            }
        }));
        //Взять обращение в работу
        app.get('/take-on-job', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            //const {requests_id} =req.query
            const request_id = req.query.id;
            console.log('id= ', request_id);
            ithem1 = yield connection
                .createQueryBuilder()
                .update(observation_entity_1.Requests, { status: "В работе" })
                .where('requests.id = :id', { id: request_id })
                //.returning(['id', 'status'])
                .updateEntity(true)
                .execute();
            console.log('/take-on-job ithem1 ', ithem1);
            res.setHeader('Content-Type', 'application/json').json([request_id, 'В работе']);
            return;
        }));
        //Завершить обработку обращения
        app.post('/complete-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            //const {requests_id} =req.query
            const request_id = req.body.id;
            const reply = req.body.reply;
            //console.log('id= ', requests_id, request_id);
            ithem1 = yield connection
                .createQueryBuilder()
                .update(observation_entity_1.Requests, { status: "Завершено", reply: reply })
                .where('requests.id = :id', { id: request_id })
                //.returning(['id', 'status'])
                .updateEntity(true)
                .execute();
            //console.log(ithem1);
            res.setHeader('Content-Type', 'application/json').json([request_id, 'Завершено']);
        }));
        //Отмена обращения
        app.post('/cancel-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('/cancel-request');
            //const {requests_id} =req.query
            const request_id = yield req.body.id;
            const reply = yield req.body.reply;
            //console.log('id= ', requests_id, request_id);
            console.log('id= ', request_id, 'reply ', reply);
            //return
            ithem1 = yield connection
                .createQueryBuilder()
                .update(observation_entity_1.Requests, { status: "Отменено", reason_for_cancellation: reply })
                .where('requests.id = :id', { id: request_id })
                //.returning(['id', 'status'])
                .updateEntity(true)
                .execute();
            //console.log(ithem1);
            res.setHeader('Content-Type', 'application/json').json([request_id, 'Отменено']);
        }));
        //получить  обращение по id
        app.get('/list-of-requests-id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            const request_id = req.query.id;
            //console.log('id= ', request_id);
            const ithem1 = yield connection
                .getRepository(observation_entity_1.Requests)
                .createQueryBuilder("requests")
                .where('requests.id = :id', { id: /*request_id*/ Number(3) })
                .getOne();
            //console.log(ithem1);
            res.setHeader('Content-Type', 'application/json').json(ithem1);
        }));
        //отменить все обращения "В работе"
        app.get('/job-all-cancel', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            ithem1 = yield connection
                .createQueryBuilder()
                .update(observation_entity_1.Requests, { status: "Отменено", reason_for_cancellation: "Групповая отмена" })
                .where('requests.status = :status', { status: "В работе" })
                //.returning(['id', 'status', 'theme', 'request'])
                .updateEntity(true)
                .execute();
            //console.log(ithem1);
            res.setHeader('Content-Type', 'application/json').json("Групповая отмена");
        }));
        app.listen(PORT, () => console.log(`⚡Server is running here 👉 https://localhost:${PORT}`));
    }))
        .catch((err) => {
        console.error("Error during Data Source initialization:${err}", err);
        //  /*await*/ MySqlDataSource.destroy();
    });
}))();
