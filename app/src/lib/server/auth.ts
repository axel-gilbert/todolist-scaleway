import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'auth-session';

function generateSessionToken(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(20));
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(userId: string): Promise<table.Session> {
	const token = generateSessionToken();
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: table.Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + DAY_IN_MS * 30)
	};
	await db.insert(table.session).values(session);
	return session;
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export async function validateSession(sessionId: string) {
	const [result] = await db
		.select({
			user: { 
                id: table.user.id, 
                email: table.user.email,
                firstName: table.user.firstName,
                lastName: table.user.lastName
            },
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.user, eq(table.session.userId, table.user.id))
		.where(eq(table.session.id, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user };
}

export async function hashPassword(password: string): Promise<string> {
    const hashedPassword = encodeHexLowerCase(sha256(new TextEncoder().encode(password)));
    return hashedPassword;
}

export async function createUser(email: string, password: string, firstName: string, lastName: string): Promise<table.User> {
    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(password);
    
    const user = {
        id: userId,
        email,
        passwordHash,
        firstName,
        lastName,
        createdAt: new Date()
    };
    
    await db.insert(table.user).values(user);
    return user;
}

export async function verifyPassword(email: string, password: string) {
    const [user] = await db
        .select()
        .from(table.user)
        .where(eq(table.user.email, email));
    
    if (!user) {
        return null;
    }
    
    const hashedPassword = await hashPassword(password);
    if (hashedPassword !== user.passwordHash) {
        return null;
    }
    
    return user;
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSession>>;
