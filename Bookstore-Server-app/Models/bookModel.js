//Inicialización - Exportación de dependencias
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    literaryGenres: { type: String, requiered: true },
    year: { type: Number, requiered: true },
    pages: { type: Number, requiered: true },
    description: { type: String, required: true },
    price: { type: Number, requiere: true },
    units: { type: Number, requiered: true }
});

//No se repite el titulo del libro
bookSchema.index({ title: 1 });

var book = mongoose.model('Books', bookSchema);

//Se exporta el modelo book
module.exports = {
    Book: book
};