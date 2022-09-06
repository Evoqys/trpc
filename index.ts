import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import express from 'express';
import cors from 'cors';

const app = express()
app.use(cors())

export const appRouter = trpc.router().query('hello', {
    input: z
        .object({
            text: z.string().nullish(),
        })
        .nullish(),
    resolve({ input }) {
        return {
            message: `hello ${input?.text ?? 'world'}`,
        };
    },
});

export type AppRouter = typeof appRouter;

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
    })
);

app.listen(4000);