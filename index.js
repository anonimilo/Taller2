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
    app.listen(5500);
});



app.get('/', (req, res) => {
    

    var prod = db.collection('cono')
    .find();
    
    if(req.query.oferta)
        prod.filter({ oferta: req.query.oferta });


    prod.toArray((err, result) => {
            console.log('hola servidor')
            res.render('index', {
                helado: result
            });
        })
});



