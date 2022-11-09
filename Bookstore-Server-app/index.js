var cors = require('cors');

var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    books = require('./Controllers/bookController'),
    mongoose = require('mongoose');

//MongoDB Conexión
mongoose.connect('mongodb://localhost:27017/Bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {
    console.log("Connected to BD");
}).catch(err => {
    console.log("The connection to BD coul not be stablised");
    process.exit();
});


var server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(bodyParser.urlencoded({
    extended: true
}));

var corsOptions = {
    origin: "http://localhost:27017/index.html"
}

server.set('port', process.env.PORT || 3000);

server.get('/', books.root);
server.get('/books', books.index); // Obtiene  la info todos los documentos de los libros
server.get('/books/:id', books.show); // Obtiene la info de un libro en especifico por el id
server.post('/books', books.create); // Crea un nuevo documuento de libro
server.put('/books', books.update); // Edita la info del documento del libro
server.delete('/books/:id', books.delete); // Elimina un libro


http.createServer(server).listen(server.get('port'), function() {
    console.log("Express server listening on port %s.", server.get('port'));
});