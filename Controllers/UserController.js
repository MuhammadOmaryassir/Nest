const {Users} = require('../models/Users')
const _ = require('lodash')


class UserController {
  post(req,res){
    let body = _.pick(req.body, ['email', 'password','firstName','lastName','userName',
    'phoneNumber','type','birthDate'])
    let user = new Users(body)
    user
      .save()
      .then(() => {
        return user.generateAuthToken()
      })
      .then((token) => {
        res.header('x-auth', token).send(user) 
      })
      .catch((e) => {
        res.status(400).send(e) 
      })
  }
  // TODO
  get(req,res){
    res.send("hi")
  }
}
let controller = new UserController()
module.exports = {
  post: controller.post,
  get:controller.get
}