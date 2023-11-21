const bcrypt=require('bcrypt');
module.exports={
    checkpassword(saved_pass,user_pass) {
        return saved_pass==user_pass;
    }
}