import { ORDERS, USERS } from './db.js';

export const authorizationMiddleware = (req, res, next) => {
 const { headers } = req;

 const token = headers.authorization;

 const user = USERS.find(el => el.token === token);

 if (!user) {
  return res.status(400).send({ message: "user with such token was not found" });
 }

 req.data = { user };

 return next();
};