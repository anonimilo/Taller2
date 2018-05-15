const MongoClient = require('mongodb').MongoClient,
    express = require('express');
engines = require('consolidate');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static('public'));
// Conectarse a Base de Datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;
    db = client.db('Helados');



    // Iniciar servidor
    app.listen(1234);
});

app.get("/", (req, res) => {




    console.log("hola");
    var cono = db.collection('cono').find();
    if (req.query.precio) {
        console.log(req.query.precio);
        cono.filter({
            precio: {
                $gte: parseFloat(req.query.precio[0]),
                $lte: parseFloat(req.query.precio[1])
            }
        });
    }
    if (req.query.sabor) 
    cono.filter({
        sabor: req.query.sabor
    });

    cono.toArray((err, result) => {
        console.log(result);
        res.render('index', {
            cono: result
        })
    });

});