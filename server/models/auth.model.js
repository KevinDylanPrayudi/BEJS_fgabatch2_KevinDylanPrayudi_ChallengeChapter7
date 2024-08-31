const db = require('../config/db');

function registration(data) {
    const result = db.user.create({
        data: {
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            password: data.password
        }
    });

    return result
}

function forgot_password({ email, token }) {
    const result = db.user.update({
        where: {
            email
        },
        data: {
            token: token
        }
    })

    return result;
}

function new_password({ id, password }) {
    const result = db.user.update({
        where: {
            id
        },
        data: {
            password: password,
            token: null
        }
    })
    
    return result
}

function get({ email }) {
    const result = db.user.findUnique({
        where: {
            email
        }
    })

    return result
}

module.exports = {
    registration,
    forgot_password,
    new_password,
    get
}