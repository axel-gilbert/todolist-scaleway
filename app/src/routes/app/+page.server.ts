import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { todo } from '$lib/server/db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/login');
    }
    
    const todos = await db
        .select()
        .from(todo)
        .where(eq(todo.userId, locals.user.id))
        .orderBy(desc(todo.createdAt));
    
    return {
        todos
    };
};

export const actions: Actions = {
    addTodo: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(303, '/login');
        }
        
        const data = await request.formData();
        const title = data.get('title')?.toString();
        const description = data.get('description')?.toString();
        
        if (!title) {
            return fail(400, { error: 'Le titre est requis' });
        }
        
        const todoId = crypto.randomUUID();
        
        await db.insert(todo).values({
            id: todoId,
            userId: locals.user.id,
            title,
            description: description || null,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return { success: true };
    },
    
    updateTodo: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(303, '/login');
        }
        
        const data = await request.formData();
        const id = data.get('id')?.toString();
        const title = data.get('title')?.toString();
        const description = data.get('description')?.toString();
        
        if (!id || !title) {
            return fail(400, { error: 'ID et titre sont requis' });
        }
        
        await db.update(todo)
            .set({ 
                title, 
                description: description || null, 
                updatedAt: new Date() 
            })
            .where(and(eq(todo.id, id), eq(todo.userId, locals.user.id)));
        
        return { success: true };
    },
    
    toggleTodo: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(303, '/login');
        }
        
        const data = await request.formData();
        const id = data.get('id')?.toString();
        const completed = data.has('completed');
        
        if (!id) {
            return fail(400, { error: 'ID est requis' });
        }
        
        await db.update(todo)
            .set({ 
                completed, 
                updatedAt: new Date() 
            })
            .where(and(eq(todo.id, id), eq(todo.userId, locals.user.id)));
        
        return { success: true };
    },
    
    deleteTodo: async ({ request, locals }) => {
        if (!locals.user) {
            throw redirect(303, '/login');
        }
        
        const data = await request.formData();
        const id = data.get('id')?.toString();
        
        if (!id) {
            return fail(400, { error: 'ID est requis' });
        }
        
        await db.delete(todo)
            .where(and(eq(todo.id, id), eq(todo.userId, locals.user.id)));
        
        return { success: true };
    }
}; 