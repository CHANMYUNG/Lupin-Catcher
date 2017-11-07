const app = require('express')();
let passport = require('./authentication/passport');
const server = require('http').createServer(app);
const session = require('express-session');
const database = require('./database');
const bodyParser = require('body-parser');

let io = require('socket.io')(server);

app.route('/room').get((req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.route('/js/index.js').get((req, res) => {
    res.sendFile(__dirname + '/public/js/index.js');
})

io.on('connection', function (socket) {
    console.log(socket);
    socket.on('enter', function (data) {
        console.log(data);
    })
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(session({
    secret: '비밀코드',
    resave: true,
    saveUninitialized: false
})); // 세션 활성화
app.use(require('passport').initialize()); // passport 구동
app.use(require('passport').session()); // 세션 연결

passport();

app.use('/', require('./routes'));
server.listen(5000, () => {
    database();
    console.log("RUNNING ON 5000 PORT");
})