import { SignupDto, LoginDto } from "../dtos/AuthDtos.js";
import {UserRepository} from "../repositories/user.js";
import JWT from 'jsonwebtoken';

export function registerUserRoutes(fastify) {

    fastify.post('/signup', {schema:SignupDto}, async function signUp(request, reply) {
        const body = request.body;
        const user = await UserRepository.createUser(body.email, body.password);
        return user;
    });

    fastify.post('/login', {schema: LoginDto}, async function login(request, reply) {
        const body = request.body;
        const user = await UserRepository.getUserByCredentials(body.email, body.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        user.token = JWT.sign({id:user.id}, process.env.JWT_SECRET)
        return user;
    });
}