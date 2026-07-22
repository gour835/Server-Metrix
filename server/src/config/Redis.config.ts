import { createClient } from 'redis';


    const username: string | undefined = process.env.REDIS_USERNAME || 'default';
    const password: string | undefined = process.env.REDIS_PASSWORD || 'foobared';
    const client = createClient({
        username,
        password
    });

    client.on('error', err => {
        console.log('Redis Error', err);
    })

    await client.connect();



export default client;