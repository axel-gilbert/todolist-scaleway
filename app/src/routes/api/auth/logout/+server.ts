import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import * as auth from '$lib/server/auth';

export const POST: RequestHandler = async ({ cookies, locals }) => {
    if (locals.session) {
        await auth.invalidateSession(locals.session.id);
    }
    
    cookies.delete(auth.sessionCookieName, { path: '/' });
    
    return json({ success: true });
}; 