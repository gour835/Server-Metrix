import os from 'os';
import axios from 'axios';


function getIPAdress() {
    const interfaces = os.networkInterfaces();
    let Ipv4: string | null = null;
    let Ipv6: string | null = null;

   for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];
        
        if (!networkInterface) continue;

        for (const network of networkInterface) {
            if (network.internal) continue;

            // Check for IPv4
            if (network.family === 'IPv4' && !Ipv4) {
                Ipv4 = network.address;
            }
            
            // Check for IPv6
            if (network.family === 'IPv6' && !Ipv6) {
                Ipv6 = network.address;
            }

            // Break early if we found both
            if (Ipv4 && Ipv6) break;
        }
    }

}
function getMetrix() {
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
        const server = await axios.post('http://localhost:8080/api/metrix', payload, { withCredentials: true });
        console.log(`[${new Date().toLocaleTimeString()}] Metrics successfully transmitted. Server responded with status: ${server.status}`);
    } catch (error: any) {
        console.log(error.message);
    }
}

function start() {
    //register the server first
    setInterval(async () => {
        console.log('sending the metrix')
        const payload = getMetrix();

        await sendMetrix(payload);
    }, 2500);
}
start();