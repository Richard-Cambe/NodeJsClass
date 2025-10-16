import { PostRepository } from "../repositories/post.js";
import { CreatePostDto, GetPostsDto, GetPostDto, DeletePostDto, UpdatePostDto } from "../dtos/PostDtos.js"

export function registerPostRoutes(fastify) {
    fastify.get('/posts', { schema: GetPostsDto }, async function getPosts(request, reply) {
        //Todo return a list of posts
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        return await PostRepository.getPosts(page, limit);
    });

    fastify.get('/posts/:id', { schema: GetPostDto }, async function getPost(request, reply) {
        //Return a post
        const id = parseInt(request.params.id);
        return await PostRepository.getPost(id);
    });

    fastify.post('/posts', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreatePostDto
    }, async function createPost(request, reply) {
        //Return a post
        const body = request.body;
        return await PostRepository.createPost(body);
    });

    fastify.put('/posts/:id', {
        preHandler: fastify.auth([fastify.authUser]),
        schema: UpdatePostDto
    }, async function updatePost(request, reply) {
        //Return a post
        const id = parseInt(request.params.id);
        const body = request.body;
        return await PostRepository.updatePost(id, body);
    });

    fastify.delete('/posts/:id', { 
        preHandler: fastify.auth([fastify.authUser]),
        schema: DeletePostDto 
    }, async function deletePost(request, reply) {
        //Return a post
        const id = parseInt(request.params.id);
        return await PostRepository.deletePost(id);
    });
}