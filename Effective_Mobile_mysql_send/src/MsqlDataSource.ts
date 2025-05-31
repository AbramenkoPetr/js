import { DataSource } from 'typeorm'
import { Requests } from './observation.entity';

export const MySqlDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "userms",
  password: "1234",
  database: "db_requests",
  timezone: 'Z',
  entities: [Requests],
  
})