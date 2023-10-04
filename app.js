const express = require('express');
const path = require('path');
const app = express();
const { SerialPort } = require('serialport');
const port = new SerialPort({
    path: 'COM7',
    baudRate: 115200
});
const { ReadlineParser } = require('@serialport/parser-readline')


const parser = new ReadlineParser();
const ejs = require('ejs');


//const status = 1;
const hr = 90;
//const temp = 38;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
const server = app.listen(3000, () => {
    console.log("Listening on port: " + 3000);
});
const io = require('socket.io')(server);

port.pipe(parser);
parser.on('data', (data) => {
    const temperature = data.toString().trim().split(' ')[1];
    const x = data.toString().trim().split(' ')[5];
    const y = data.toString().trim().split(' ')[7];
    var status = "na";
    var command = "na";
    if(temperature > 30) {
        status = "good";
        io.emit('temperature', temperature);
        io.emit('status', status);
        console.log(status);
        console.log(temperature);
        console.log(x);
        console.log(y);
        if (x > 1) {
          console.log(command);
          command = "Water Please";
          io.emit('command', command);
        }
        else if (x < -1) {
          console.log(command);
          command = "Food Please";
          io.emit('command', command);
        }
        else if (y < -1) {
          console.log(command);
          command = "Its hot, turn up the AC";
          io.emit('command', command);
        }
        else if (y > 1) {
          console.log(command);
          command = "Its cold, turn down the AC";
          io.emit('command', command);
        }
    }
    else {    
        status = "bad";
        io.emit('temperature', temperature);
        io.emit('status', status);
        console.log(status);
        console.log(temperature);
        console.log(x);
        console.log(y);
        if (x > 1) {
          console.log(command);
          command = "Water Please";
          io.emit('command', command);
        }
        else if (x < -1) {
          console.log(command);
          command = "Food Please";
          io.emit('command', command);
        }
        else if (y < -1) {
          console.log(command);
          command = "Its hot, turn up the AC";
          io.emit('command', command);
        }
        else if (y > 1) {
          console.log(command);
          command = "Its cold, turn down the AC";
          io.emit('command', command);
        }
    }
  }
);


app.get('/', (req, res) => {;
    res.render('home',{hr}); 
});






// app.listen(3000, () => {
//     console.log('listening on port 3000')
// });