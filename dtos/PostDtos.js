export const CreatePostDto = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
        },
        required: ['title'],
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
            },
            required: ['id', 'title']
        }
    }
};

export const GetPostsDto = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number' },
            limit: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                },
                required: ['id', 'title']
            }
        }
    }
};

export const GetPostDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                content: { type: 'string' },
            },
            required: ['id', 'title', 'content']

        }
    }
};

export const DeletePostDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                content: { type: 'string' },
            },
            required: ['id', 'title', 'content']
        }
    }
};

export const UpdatePostDto = {
    body: {
        type: 'object',
        properties: {
            id: { type: 'number' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                content: { type: 'string' }
            },
            required: ['id', 'title', 'content']
        }
    }
};