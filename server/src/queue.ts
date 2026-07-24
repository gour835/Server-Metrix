import { Worker, Job, Queue } from "bullmq";
import { Redis } from 'ioredis';


const connection = new Redis({
  host: 'localhost',
  port: 6379,
  username: 'default',
  password:'foobared',
  maxRetriesPerRequest: null 
});

export const ques = new Queue('ques', {connection});

const worker = new Worker('ques', async(job: Job)=>{
    console.log(`Job with id: ${job.id}, started for ${job.data.email}`);
    //heavy task
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Heavy task completed inside promise wrapper');

    console.log(`Job with id: ${job.id} completed`);
}, {connection});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});