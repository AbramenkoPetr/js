//1 открыть терминал, перейти в корень проекта
//2 создать базу данных mysql 
mysql -uroot -p
mysql> source batch-file;
mysql> \q
//3 В файле src/MsqlDataSource.ts 
изменить значения username: и password: для своей учетной записи
//4 В терминале:
npm i
npm run start:prod
//5 вбраузере 
http://localhost:3000/
