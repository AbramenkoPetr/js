import { configureStore } from '@reduxjs/toolkit';
//import { combineReducers } from 'redux';
import fs from 'fs';
import jwt from "jsonwebtoken";
import express from "express";

import jsonwebtoken from 'jsonwebtoken';
//const jwt_decode = require("jwt_decode");

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

const app = express();
app.use(express.json());
//Разрешение cors
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'/*"http://localhost:3000"*/]);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} is trying to login ..`);


    var arrayUser = fs.readFileSync('userArray.txt').toString();
    //console.log('/login arrayUser input ', arrayUser);
    var arrayUserObj = JSON.parse(arrayUser);
    //console.log('/login arrayUserObj ', arrayUserObj);
    var tokenUser;

    function reducerUser(state = arrayUserObj){
      switch ('') {
      default: // Действие по умолчанию — это возврат текущего состояния
       return state;
      }
    }
    var storeUser = configureStore({
      reducer: reducerUser,
      
    })
    const state = storeUser.getState();
    //console.log('/login state ', state);
    state.forEach(e => {
      //console.log('/login e ', e);
      if (e.email === username) {
        tokenUser = e.token
      }
    });
    if(!tokenUser)	
    return res
      .status(401)
      .json({ message: "The username and password your provided are invalid" });
    
    //console.log('state ', state);
     //console.log('/login tokenUser ', tokenUser);
    // console.log('storeUser() ', storeUser.getState());

    const token1 = tokenUser.split('.')[1];
    const decoded = Buffer.from(token1, 'base64').toString();
    
    const decodedObj = JSON.parse(decoded);
    // console.log('/login decodedObj ', decodedObj);
    // console.log('/login decodedObj.mail ',decodedObj.mail, 'decodedObj.password ', decodedObj.password);
    // console.log('/login username ',username, 'password ', password);

    if (username === decodedObj.mail && password === decodedObj.password) {
      return res.json(
        
        { user: username, 
          tokenUser: tokenUser,
          message: `You are authorized as a ${username}.`
        }
        );
    }
    else  {
    return res
      .status(401)
      .json({ message: "The username and password your provided are invalid" });
    }
  });




  app.post("/registr", (req, res) => {
  
   //console.log('/registr req.body ', req.body);
    const { username, password } = req.body;
   //console.log('/registr ', `${ username }, ${ password } is trying to registr ..`);
   if( username === '' || password === '') return res.json({ 
        message: `Invalid email or password.`
    });
    var delId;

    const ADD_USER = 'ADD_USER';
    const DELETE_USER = 'DELETE_USER';
    var addUserAction = {};
    var delUserAction = {};
    var token = jsonwebtoken.sign({ mail: username, password: password }, JWT_SECRET);
    var arrayUser = fs.readFileSync('userArray.txt').toString();
   // console.log('arrayUser input ', arrayUser);
    var arrayUserObj = JSON.parse(arrayUser);
    //console.log('arrayUser obj ', arrayUserObj);
    if (arrayUserObj.length === 0) var idUserNext = 1
    else idUserNext = arrayUserObj[arrayUserObj.length - 1].id + 1;
    //console.log('idUserNext ', idUserNext);
    
    function reducerUser(state = /*[]*/arrayUserObj, action)  {
      // console.log('action.payload ', action.payload);
      // console.log('action.type ', action.type);
      // console.log('state ', state);
   switch (action.type) {
     case ADD_USER: {
       const item = action.payload
       return [...state, item]
     }
      case 'DELETE_USER':{
        const itemIn = state
        //console.log('reducerUser case DELETE_USER itemIn ', itemIn);
      
        var item
        var itemOut
        var noUser =[];
        
       for (let i= 0; i < itemIn.length; i++ ) {
         if (itemIn[i].email !== username) 
           noUser.push(itemIn[i]);
       }
       //console.log('/registr reducerUser case DELETE_USER noUser ', noUser);
       item = noUser;
      //console.log('reducerUser case DELETE_USER item ', item);
      return [ ...item]     
     
     }           
     
     default: // Действие по умолчанию — это возврат текущего состояния
       return state;
   }
   }

   var storeUser = configureStore({
    reducer: reducerUser,
    
  })
  //console.log('storeUser() ', storeUser.getState())
  // storeUser.subscribe(() => {
  //   console.log('storeUser() ', storeUser.getState());
    
  // });
  
  

    addUserAction = {
      type: ADD_USER,
      payload: {
         id: idUserNext,
         email: username,
         token: 'Bearer ' + token
         
       }
    }
    delUserAction ={
      
        type: DELETE_USER,
        payload: 
         username,
                
    }
    
    storeUser.dispatch(delUserAction);
    storeUser.dispatch(addUserAction);
    //console.log('storeUser() ', storeUser.getState())
    const array = storeUser.getState();
    //console.log('storeUser.getState() ',array);

    fs.writeFileSync('./userArray.txt', JSON.stringify(array), 'utf-8');
    return res.json({ 
        message: `User ${username} has been successfully registered!`
    });
  });

app.listen(3001, () => {
  console.log("API running on localhost:3001");
});
