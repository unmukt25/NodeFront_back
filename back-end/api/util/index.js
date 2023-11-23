const bcrypt = require('bcrypt');

module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

module.exports.hashThisPassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

module.exports.checkPassword = async (saved_pass, user_pass) => {
    const userPassHash=await this.hashThisPassword(user_pass,await GenerateSalt());
    return saved_pass == user_pass;

};