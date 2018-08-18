//function(exports,require,module,__filename,__dirname) module wrapper function
// const log = require('./logger');
// log.log(`Hi I am from ${'./logger.js'}`)
//------------------------------------------------
//built in module
//------------path----------------------
// const path = require('path');
// let out = path.parse(__dirname);
// console.log(out);
//------------OS---------------------operating system
// const os = require('os');
// console.log(`TotalMemory: ${os.totalmem} \nFreeMemory: ${os.freemem}`);
//---------------fs-------------------filestream
// const fs = require('fs');
// out = fs.readdir('./',(err,files)=>{
//     if (err) {
//         console.log('Error:',err);
        
//     } else {
//         console.log('Result',files);
        
//     }
// });
//---------------EventEmitter-----------------------------
// const EventEmitter = require('events');
// const emitter = new EventEmitter();
//register a listener
// emitter.on('messagelogged',(e)=>console.log(`Id: ${e.id}\nGender: ${e.gender}\nAge: ${e.age}\nLogged Successfully!`));
//raise the event
// emitter.emit('messagelogged')
//raise an event with an eventArg in order to do more things
// emitter.emit('messagelogged',{id:1,gender:'male',age:24});

//Actually we should only register the event here while raise somewhere(let somebody to handle it we
//just register it like a waiter) So we make a logger class

// const Logger = require('./logger');
// const logger = new Logger();
// logger.on('logging',(e)=>console.log(e));//register very similar to delegate
// logger.log('John');

//-------------------------http---------------------------------
const http = require('http');
let server = new http.Server((req,res)=>{
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }
    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});
server.listen(8080);