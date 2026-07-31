import { Worker, Job, Queue } from "bullmq";
import { Redis } from 'ioredis';
import ServerMetrixModel from "./models/serverMetrix.model.js";
import client from "./config/Redis.config.js";



const username: string | undefined = process.env.REDIS_USERNAME || 'default';
const password: string | undefined = process.env.REDIS_PASSWORD || 'foobared';
const host: string | undefined = process.env.REDIS_HOST || 'localhost';
const port: number | undefined = Number(process.env.REDIS_PORT) || 6379;

const connection = new Redis({
  host,
  port,
  username,
  password,
  maxRetriesPerRequest: null 
});

export const SaveMetrixs = new Queue('SaveMetrixs', {connection});

const worker = new Worker('SaveMetrixs', async(job: Job)=>{
    console.log(`Job with id: ${job.id} started`);

    const data = job.data.data;
    const server = job.data.server
    
    await ServerMetrixModel.insertOne(data);

        await client.set(`server:metrics:live:${server.Ipv4}`, JSON.stringify(data), {
            EX: 15
        });

        const redis_data = await client.get(`server:metrics:live:${server.Ipv4}`);

        console.log(redis_data);
    console.log(`Job with id: ${job.id} completed`);
    return ({success: true, jobID: job.id});
}, {connection});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});