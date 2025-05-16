import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as auth from '$lib/server/auth';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        
        if (!email || !password) {
            return fail(400, { 
                error: 'Email et mot de passe sont obligatoires',
                email
            });
        }
        
        try {
            const user = await auth.verifyPassword(email, password);
            
            if (!user) {
                return fail(400, { 
                    error: 'Email ou mot de passe incorrect',
                    email
                });
            }
            
            const session = await auth.createSession(user.id);
            
            cookies.set(auth.sessionCookieName, session.id, {
                path: '/',
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 30 // 30 days
            });
            
            return { success: true };
        } catch (error: any) {
            console.error('Erreur lors de la connexion:', error);
            return fail(500, { 
                error: 'Une erreur est survenue lors de la connexion',
                email
            });
        }
    }
}; 