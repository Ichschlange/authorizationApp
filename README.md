# authorizationApp
This app realizes an common process of registration and authorization on side of a server. It uses mongoDB as a database and contains two models: user and roles.
The app has three routes, that are described in authRouter.js. They are registration, login and see all users.
Besides, there are two middlewares, that verify user's authorization or user's permission to see all registrated users.
