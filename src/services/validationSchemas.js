const yup = require('yup');

const createUserSchema = yup.object().shape({
    name: yup.string(/^[a-zA-Z]+|\s[a-zA-Z]+/).required("The name is mandatory."),
    email: yup.string().email().required("Email is mandatory.").matches(/\S+@\S+\.\S+/),
    password: yup.string().required()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*+=._&!@#\-])[0-9a-zA-Z$*&!=._\-@#+]{8,}$/,
            'Password does not meet minimum requirements')
});

const updateUserSchema = yup.object().shape({
    name: yup.string(/^[a-zA-Z]+|\s[a-zA-Z]+/),
    password: yup.string().matches(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[$*+=.&!@#-])[0-9a-zA-Z$*&!=._\-@#+]{8,}$/,
        'Password does not meet minimum requirements')
})

module.exports = {
    createUserSchema,
    updateUserSchema
}