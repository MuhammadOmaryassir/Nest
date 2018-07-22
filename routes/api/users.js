const express = require('express')
const UserRouter = express.Router()
const UserController = require('../../Controllers/UserController')
UserRouter.route('/register')

class Router {
  routes(){
    UserRouter.route('/register')
      .post(UserController.post)
      .get(function(req,res){
        res.send("hi")
      })
  }
}

let route = new Router()
route.routes()
module.exports = UserRouter