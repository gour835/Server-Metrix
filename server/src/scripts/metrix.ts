import os from 'os';
import axios from 'axios';

interface getIPAdress_Return {
    Ipv4: string | null,
    Ipv6: string | null,

}

interface getMetrix_Return{
    x_api_key?: string,
    timeStamp: string,
        cpus: {
            model: string,
            speed: number,
            times: { user: number, nice: number, sys: number, idle: number, irq: number }
            
        }[],
        memory: {
            freeMemory: number,
            totalMemory: number,
            userMemory: number,
            MemoryPercentage: string
        }
}

const server_uri : string | undefined= process.env.SERVER_URI;

function getIPAdress(): getIPAdress_Return {
    const interfaces = os.networkInterfaces();
    let Ipv4: string | null = null;
    let Ipv6: string | null = null;

    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];

        if (!networkInterface) continue;

        for (const network of networkInterface) {
            if (network.internal) continue;

            // Break early if we found both
            if (Ipv4 && Ipv6) break;

            // Check for IPv4
            if (network.family === 'IPv4' && !Ipv4) {
                Ipv4 = network.address;
            }

            // Check for IPv6
            if (network.family === 'IPv6' && !Ipv6) {
                Ipv6 = network.address;
            }
        }
    }
    return { Ipv4, Ipv6 };
}
function getMetrix(): getMetrix_Return {
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    const userMemory = totalMemory - freeMemory;
    const MemoryPercentage = ((userMemory / totalMemory) * 100).toFixed(3);
    return {
        timeStamp: new Date().toISOString(),
        cpus: os.cpus().map((cpu) => ({
            model: cpu.model,
            speed: cpu.speed,
            times: cpu.times
        })),
        memory: {
            freeMemory,
            totalMemory,
            userMemory,
            MemoryPercentage
        }
    }
}

async function sendMetrix(payload: object) {
    try {
        const server = await axios.post(`${server_uri}/api/metrix`, payload, { withCredentials: true });
        console.log(`[${new Date().toLocaleTimeString()}] Metrics successfully transmitted. Server responded with status: ${server.status}`);
    } catch (error: any) {
        console.log(error.message);
    }
}

async function start() {
    //register the server first
    const { Ipv4, Ipv6 } = getIPAdress();
    const { data, status } = await axios.post(`${server_uri}/api/metrix/register`, {
        Ipv4,
        Ipv6,
        SecretKey: process.env.SERVER_SECRET_KEY
    }, { withCredentials: true });

    setInterval(async () => {
    if (status === 200 || status === 202) {
            console.log('sending the metrix')
            const payload = getMetrix();
            payload.x_api_key = data.x_api_key;

            await sendMetrix(payload);
        }
    }, 2500);
    console.log('something went wrong')

}
start();

//from server folder
// npx ts-node --env-file=../.env src/scripts/metrix.ts    