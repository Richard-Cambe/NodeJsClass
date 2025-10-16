import { prisma } from "../services/db.js"
import { NotFoundError } from "../utils/errors.js";

export const PostRepository = { 
    getPosts: async (page, limit)=> {
        const start = (page - 1) * limit;
        const end = page * limit;
        return posts.slice(start, end);
    },
    getPost: async(id) => {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        })
        if(!post){
            throw new NotFoundError("Post not Found");
        }
        return post;
    },
    createPost: async(post) => {
        const newPost = await prisma.post.create({
            data: {
                title:post.title,
                content:post.content,
            },
        });
        return newPost;
    },
    updatePost: async(id, post) => {
        const newPost = await prisma.posts.update({
            where: {
                id: id
            },
            data:post
        })
        return newPost;
    },
    deletePost: async(id) => {
        const index = posts.findIndex(post => post.id === id);
        if(index === -1){
            throw new Error('Post not found');
        }
        const deleted = await prisma.posts.delete({
            where:{
                id:id,
            }
        });
        return deleted
    }

 };