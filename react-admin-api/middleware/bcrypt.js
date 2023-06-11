const bcrypt = require('bcrypt');

const hashPassword = (text) => {
    return bcrypt.hashSync(text, 10);
}

const comparePasswordWithHash = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashPassword,
    comparePasswordWithHash
}