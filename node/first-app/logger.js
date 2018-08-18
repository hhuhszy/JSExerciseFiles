// let url = 'https://www.baidu.com'

// function log(message) {
//     console.log(message);
    
// }

// module.exports.log = log;
const EventEmitter = require('events');
let url = 'https://www.baidu.com';
class Logger extends EventEmitter {
    log(message){
        //send http request
        let response = simulateHttpRequest(message);
        //raise the event 
        this.emit('logging',response);
    }
}
function simulateHttpRequest(message) {
    return student.find((value)=>value.name === message);
}
let student = [{name:'John',id:1},{name:'Mary',id:2},{name:'Tom',id:3}];

module.exports = Logger;