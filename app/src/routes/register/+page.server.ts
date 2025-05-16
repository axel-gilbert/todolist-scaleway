import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import * as auth from '$lib/server/auth';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        
        const firstName = data.get('firstName')?.toString();
        const lastName = data.get('lastName')?.toString();
        const email = data.get('email')?.toString();
        const password = data.get('password')?.toString();
        const confirmPassword = data.get('confirmPassword')?.toString();
        
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return fail(400, { 
                error: 'Tous les champs sont obligatoires',
                firstName,
                lastName, 
                email
            });
        }
        
        if (password !== confirmPassword) {
            return fail(400, { 
                error: 'Les mots de passe ne correspondent pas',
                firstName,
                lastName, 
                email
            });
        }
        
        try {
            const user = await auth.createUser(email, password, firstName, lastName);
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
            console.error('Erreur lors de l\'inscription:', error);
            // Gestion spécifique pour l'erreur d'email unique
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' || 
                (typeof error.message === 'string' && error.message.includes('UNIQUE constraint failed'))) {
                return fail(400, { 
                    error: 'Cet email est déjà utilisé',
                    firstName,
                    lastName, 
                    email
                });
            }
            
            return fail(500, { 
                error: 'Une erreur est survenue lors de l\'inscription',
                firstName,
                lastName, 
                email
            });
        }
    }
}; 