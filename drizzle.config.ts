import { defineConfig } from 'drizzle-kit'

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is not set')
}

export default defineConfig({
        dialect: 'postgresql',
        schema: './drizzle/schema.ts',
        out: './drizzle/migrations',
        strict: true,
        verbose: true,
        dbCredentials: {
                url: databaseUrl,
        },
})
