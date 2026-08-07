import type { Server, Socket } from "socket.io";


export function socketReceiveHandler(socket: Socket) {
    socket.on('text', (data) => {
        console.log('test socket received', data);
    })
}
export function socketEmitHandler(socket: Socket, data: object = { message: "Data received successfully!" }) {
    socket.emit('ram', data);
}

function completeAction(data: object) {
    console.log(data);
}
export default function socketWork(
    io: Server,
    Name: string,
    Action: 'on'|'emit',
    Data: Record<string, any> = {
        message: "Data received successfully!"      
    },
    CompleteAction :(data: any) => void= completeAction
) {
    io.on("connection", (socket) => {
        if (Action == 'on') {
            socket.on(Name, (incomingData) => {
                CompleteAction(incomingData);
            })
        }else{
            socket.emit(Name, Data);
        }
    });
}