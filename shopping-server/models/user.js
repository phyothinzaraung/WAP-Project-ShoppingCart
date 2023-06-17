const data = require("../data/data");

const users = data.userDB;

module.exports = class User{
    constructor(username, password){
        this.username = username;
        this.password = password;
    }

    login(){
        const user = users.find(user=> user.username == this.username && user.password == this.password);
        if(user){
            return user;
        }else{
            throw new Error("username and password do not match");
        }
    }
}