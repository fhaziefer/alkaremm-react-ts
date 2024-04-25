import { z } from 'zod';

const envSchema = z.object({
    REACT_APP_BASE_URL: z.string().url(),
    REACT_APP_YOUTUBE_URL: z.string().url(),
    REACT_APP_FACEBOOK_URL: z.string().url(),
    REACT_APP_TWITTER_URL: z.string().url(),
    REACT_APP_INSTAGRAM_URL: z.string().url(),
});

export const env = envSchema.parse(process.env)