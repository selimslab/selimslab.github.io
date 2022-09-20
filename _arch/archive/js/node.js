// net 
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end(txt);
}).listen(8080);

console.log('listening..!');

// file
var fs = require('fs');


fs.appendFile('x.txt', 'Hello x!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

fs.open('y.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
});


fs.writeFile('z.txt', 'Hello z!', function (err) {
    if (err) throw err;
    console.log('Saved!');
});

fs.unlink('y.txt', function (err) {
    if (err) throw err;
    console.log('y deleted!');
});


fs.rename('z.txt', 'w.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed!');
});


// url 
var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'


// async 

async function getData() {
    return Promise.resolve('data');
}

async function getMoreData(data) {
    return Promise.resolve(data + 'more data');
}

async function getAll() {
    const data = await getData();
    const moreData = await getMoreData(data);
    return `All the data: data, moreData`;
}


// events

const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
    console.log('an event occurred!');
});
myEmitter.emit('event');

getAll().then((all) => {
    console.log('all the data')
})

// regex 
const isMatch = /\d+/.test('abc123')

// str to array 
const name = "selim"
console.log(name.split("").reverse())



// map reduce 
let nums = [3, 5, 7]

const add = (a, b) => a + b
const times = (_, n) => _ * n
const twice = (_) => times(_, 2)

sum = nums.reduce(add, 0)
double = nums.map(twice)