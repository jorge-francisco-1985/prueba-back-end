const express = require("express");
const app=express();
const path=require('path');

var user={};

app.set('port',process.env.PORT || 4000);

app.use(express.static(path.join(__dirname,"public")));
const sIo=require('socket.io');
const io =sIo.listen(app.listen(app.get('port'),()=>{
    // console.log("Server on port ",app.get('port'));
}));

io.on('connection',(socket)=>{
    console.log("nueva conexión ",socket.id);
    socket.on('mensaje',(data)=>{
        data.nombre=user[socket.id];
        io.sockets.emit('mensaje',data);
        
    });
    socket.on('nuevo_usuario',(data)=>{
        user[socket.id]=data;     
        console.log(user);
           
    });
    
});

