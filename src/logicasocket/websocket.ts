import { Server } from 'socket.io';
import { guardarFromForm, guardarNewMessage } from '../modules/guardar';
import { productos, msn } from '../modules/data';


export const initWSServer = (server:any) => {
    const io = new Server(server);
    
    io.on('connection', (socket:any) => {
        console.log('Nueva Conexion establecida!');

        socket.on('newProducto', (data:any) => {
            let res = guardarFromForm(data);

            if (res === 400) {
                socket.emit('mensajes', 'Datos no validos en el formulario');
            } else {
                let producto = [productos[productos.length - 1]];
                io.emit('update', producto);
            }
            //RESPUESTA A UN SOLO CLIENTE
            // socket.emit('mensajes', messages);
      
            //ENVIARLE MENSAJE A TODOS
            //io.emit('update', messages);
      
            //PARA ENVIARLE MENSAJE A TODOS MENOS AL QUE LO MANDO
            // socket.broadcast.emit('mensajes', messages);
        });

        socket.on('Productos', () => {
            console.log('Envie los productos');
            if (productos.length > 0) {
              socket.emit('update', productos);
            }
        });

        socket.on('newMensaje', (data:any) => {
            console.log('Guarda Mensajes');
            guardarNewMessage(data);
            let message = [msn[msn.length - 1]];
            io.emit('updateChat', message);
        });

        socket.on('Mensajes', () => {
            console.log('Envie Mensajes');
            if (msn.length > 0) {
              socket.emit('updateChat', msn);
            }
        });
    
    });

    return io;
};    









