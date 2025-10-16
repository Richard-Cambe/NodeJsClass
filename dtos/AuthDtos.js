export const SignupDto = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string'},
            password: {type: 'string'}
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                email: {type: 'string'},
                password: {type: 'string'}
            },
            required:['id', 'name', 'password']
        }
    }
};

export const LoginDto = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string'},
            password: {type:'string'}
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: {type: 'number'},
                email: {type: 'string'},
                password:{type:'string'},
            },
            required:['id', 'name', 'password']
        }
    }
};