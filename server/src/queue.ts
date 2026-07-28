import { Worker, Job, Queue } from "bullmq";
import { Redis } from 'ioredis';



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

export const SendMetrixs = new Queue('SendMetrixs', {connection});

const worker = new Worker('SendMetrixs', async(job: Job)=>{
    console.log(`Job with id: ${job.id}, started for ${job.data.email}`);
    //heavy task
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Heavy task completed inside promise wrapper');

    console.log(`Job with id: ${job.id} completed`);
    return ({success: true});
}, {connection});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});