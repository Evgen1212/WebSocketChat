// const express = require("express");
const sequelize = require('./database');
const User = require("./User");
const ws = require("ws");

//  Если в бд есть подобная таблица, но она не соответствует определению модел то "{ force: true }" пересоздаст с новой структурой 
sequelize.sync({ force: true }).then(() => console.log('database is ready'))

const wss = new ws.Server({
    port: 5000,
}, () => console.log("serve started on 5000"))

//подписались на событие "подключение" к нашему серверу "wss" и в call-back передаем WebSocket
wss.on('connection', function connection(ws) {
    //прослушиваем подключение конкретного одного пользователя 
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                // ws.send()
                // отправит сообщение только самому себе, 
                // т.к. ws - это одно подключение, кто отпраивил - тот и получит
                bradCastMessage(message);
                break;
            case 'connection':
                User.create(message).then(() => {

                    console.log(`пользователь ${message.username} записан в БД`)
                })
                bradCastMessage(message);
                break;

        }
    })
})

function bradCastMessage(message) {
    // обращаемся к нашему серверу и достаем все подключение в поле "clients"
    wss.clients.forEach((client) => {
        //каждый клиент является ws
        client.send(JSON.stringify(message))
    })
}






// const message = {
//     event = 'message/connection',
//     id: 1,
//     date: '14.06.2021',
//     username: 'Evgen',
//     message: 'Hellow world!'
// }