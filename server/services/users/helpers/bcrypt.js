const bcrypt = require('bcrypt');

function hash(plainText) {
    return bcrypt.hashSync(plainText, 10);
}

function compare(plainText, encryptedText) {
    return bcrypt.compareSync(plainText, encryptedText);
}

module.exports = {
    hash,
    compare
}