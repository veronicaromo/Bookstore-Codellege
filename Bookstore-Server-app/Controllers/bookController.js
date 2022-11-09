//exporta de modulos
var Book = require("../models/bookModel").Book;

//Exporta una funación que envia un mensaje
exports.root = function(req, res) {
    res.send("Bookstore API");
}

exports.index = function(req, res) {
    //El modelo (book) simplifica la conexión a la bd
    Book.find({}, //Función de Moongose
        function(err, docs) {
            if (!err) { //si no existe un error trae el json de docs
                res.status(200).json({ books: docs });
            } else { //500 error del lado del servidor
                res.status(500).json({
                    message: "Error en la bd" +
                        err
                });
            }
        });
}

//Muestra los libros por id
exports.show = function(req, res) {
    var id = req.params.id; //Muestra el id de cada libro que se quiera
    Book.findById(id, function(err, doc) {
        if (!err && doc) { //Si se encuentra el libro y no existe el error, se muestra el json del doc
            res.status(200).json(doc);
        } else if (err) { //Error del servidor
            res.status(500).json({ message: "Error loading book" + err });
        } else { //Error porque no se encontró el libro
            res.status(404).json({ message: "Book not found" });
        }
    });
}

exports.create = function(req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var literaryGenres = req.body.literaryGenres;
    var year = req.body.year;
    var pages = req.body.pages;
    var description = req.body.description;
    var price = req.body.price;
    var units = req.body.units;

    Book.findOne({ title: { $regex: new RegExp(title, "i") } }, function(err, doc) { //regex es una expresión regular isensitivo
        if (!err && !doc) { //si  no hay error y no se encuentra el documento, se crea el objeto libro
            var newBook = new Book(); // se crea un nuevi objeto de acuerdo al esquema que se definió
            newBook.title = title;
            newBook.author = author;
            newBook.literaryGenres = literaryGenres;
            newBook.year = year;
            newBook.pages = pages;
            newBook.description = description;
            newBook.price = price;
            newBook.units = units;

            newBook.save(function(err) {
                if (!err) { // En caso de que no exista ningun erro
                    res.status(200).json({ message: "Book created with name: " + newBook.title });
                } else {
                    res.status(500).json({ message: "Could not create book, Error: " + err });
                }
            });
        } else if (!err) {
            res.status(400).json({ message: "Book with that name already exists" });
        } else {
            res.status(500).json({ message: err });
        }
    });
}

exports.update = function(req, res) {
    var id = req.body.id;
    var title = req.body.title;
    var author = req.body.author;
    var literaryGenres = req.body.literaryGenres;
    var year = req.body.year;
    var pages = req.body.pages;
    var description = req.body.description;
    var price = req.body.price;
    var units = req.body.units;

    Book.findById(id, function(err, doc) {
        if (!err && doc) { // se encuentra el documento para actualizar
            doc.title = title;
            doc.author = author;
            doc.literaryGenres = literaryGenres;
            doc.year = year;
            doc.pages = pages;
            doc.description = description;
            doc.price = price;
            doc.units = units;
            doc.save(function(err) {
                if (!err) { //si no hay error, se actualiza el documento
                    res.status(200).json({ message: "Book updated: " + title });
                } else {
                    res.status(500).json({ message: "Could not ypdate book " + err });
                }
            });
        } else if (!err) {
            res.status(404).json({ message: "Could not find book" });
        } else {
            res.status(500).json({ message: "Could not update book " + err });
        }
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;

    Book.findById(id, function(err, doc) {
        if (!err && doc) {
            doc.remove();
            res.status(200).json({ message: "Book removed." });
        } else if (!err) {
            res.status(404).json({ message: "Could not find book" });
        } else {
            res.status(500).json({ message: "Could not delete book " + err });
        }
    });
}