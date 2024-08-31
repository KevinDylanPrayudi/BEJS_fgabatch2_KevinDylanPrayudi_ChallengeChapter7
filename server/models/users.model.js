const db = require('../config/db');

function get({ email }) {
    const result = db.user.findUnique({
        where: {
            email
        }
    });

    return result
}

function getId({ id }) {
    const result = db.user.findFirst({
        where: {
            id
        }
    });

    return result
}

function put({ id, password }) {
    const result = db.user.update({
        where: {
            id
        },
        data: {
            password: password
        }
    })

    return result
}

module.exports = {
    get,
    put,
    getId
}