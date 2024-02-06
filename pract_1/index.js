// const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto';
import { ORDERS, USERS } from './db.js';
import { authorizationMiddleware } from './middlewares.js';

/*create new server */
const app = express();
// const app2 = express();

/**
 * app.use - add new middleware
 */
app.use(bodyParser.json());

/**
 * post -- create new resource
 */
app.post('/users', (req, res) => {
 const { body } = req;

 const isUserExists = USERS.some(el => el.login == body.login);

 if (isUserExists) {
  return res.status(400).send({
   message: `User with login ${body.login} already exists`
  });
 }

 USERS.push(body);

 console.log('User was created', JSON.stringify(body));

 res.status(201).send({ message: "User was created" });
});

app.post('/login', (req, res) => {
 const { body } = req;

 const user = USERS.find(el => el.login === body.login && el.password === body.password);

 if (!user) {
  return res.status(400).send({ message: "user was not found" });
 }

 const token = randomUUID();

 user.token = token;

 res.status(200).send({ message: "user was logged-in", token });
});


app.post('/orders', authorizationMiddleware, (req, res) => {
 const { body, data: { user } } = req;

 const order = { ...body, login: user.login };
 ORDERS.push(order);

 res.status(200).send({ message: "order was created", order });
});

app.get('/orders', authorizationMiddleware, (req, res) => {
 const { data: { user } } = req;

 const orders = ORDERS.filter(el => el.login === user.login);

 return res.status(200).send(orders);
});

app.listen(8080, () => {
 console.log(`Server was started`);
});