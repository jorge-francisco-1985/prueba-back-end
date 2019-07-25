const express = require("express");
const app=express();
const path=require('path');

var user={};

app.set('port',process.env.PORT || 4000);

app.use(express.static(path.join(__dirname,"public")));
const sIo=require('socket.io');
const io =sIo.listen(app.listen(app.get('port'),()=>{
    
}));

io.on('connection',(socket)=>{
    socket.on('mensaje',(data)=>{
        data.nombre=user[socket.id];
        if(!data.nombre){
            io.to(socket.id).emit('mensaje', {nombre:"Servidor",mensaje:"Debe ingresar su nombre antes de iniciar una conversación"});
        }else{
            io.sockets.emit('mensaje', data);
        }
        
        
    });
    socket.on('nuevo_usuario',(data)=>{
        user[socket.id]=data;           
    });
    socket.on('disconnect', function () {
        
        delete user[socket.id];
    });
    
});

