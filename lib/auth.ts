import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';

export function requireEnv(url: string) {
    const value = process.env[url];
    if (!value) throw new Error(`${url} is required`);
    return value;
}

const mongoUrl = requireEnv('BETTER_AUTH_MONGODB_URL');
const secret = requireEnv('BETTER_AUTH_SECRET');
const baseUrl = requireEnv('BETTER_AUTH_URL');

if (secret.length < 32) throw new Error('Must be at least 32 characters');

const parsedUrl = new URL(baseUrl);
if (parsedUrl.protocol !== 'https' && process.env.NODE_ENV === 'production')
    throw new Error('Production url must use https');

const client = new MongoClient(mongoUrl);
const db = client.db('news-24');
export const auth = betterAuth({
    appName: 'news-24',
    secret,
    baseURL: baseUrl,
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
        // requireEmailVerification: true
    }
});
