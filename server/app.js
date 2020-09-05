const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./user')()

const m = (name, text, id) => ({name, text, id})

io.on('connection', socket =>{
    socket.on('userJoined', (data, cb)=> {
        if (!data.name || !data.room) {
            return cb('no correcto mi amigo')
        }

        socket.join(data.room)

        users.remove(socket.id)
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room
        })

        cb({userId: socket.id})
        io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
        socket.emit('newMessage', m('admin', `bruh ${data.name} nice to c ya`))
        socket.broadcast
            .to(data.room)
            .emit('newMessage', m('admin', `dude ${data.name} is here hah cool party`))
    })

    socket.on('createMessage', (data, cb) => {
        if (!data.text) {
            return cb('dis is empty like muh soul')
        }
        const user = users.get(data.id)
        if (user) {
           io.to(user.room).emit('newMessage', m(user.name, data.text, data.id)) 
        }
        cb()
    })
     socket.on('userLeft', (id, cb) => {
         const user = users.remove(id)
         if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
             io.to(user.room).emit(
                 'newMessage',
                 m('admin', `dude ${user.name} juss left us. sad`)
             )
         }
         cb()
     })
     socket.on('disconnect', () => {
        const user = users.remove(socket.id)
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit(
                'newMessage',
                m('admin', `dude ${user.name} juss left us. sad`)
            )
        }
     })
})

module.exports = {
    app,
    server
}