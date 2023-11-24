const bcrypt = require('bcrypt');

module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

module.exports.hashThisPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

module.exports.checkPassword = async (saved_pass,saved_salt, user_pass) => {
    const userPassHash=await this.hashThisPassword(user_pass,saved_salt);
    
    // console.log(saved_salt);
    return saved_pass === userPassHash;

};