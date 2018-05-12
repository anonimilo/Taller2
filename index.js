const MongoClient = require('mongodb').MongoClient,
    express = require('express');
    engines = require('consolidate');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

// Conectarse a Base de Datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db('cono');

    // Iniciar servidor
    app.listen(1234);
});



app.get('/', (req, res) => {
    

    var prod = db.collection('cono')
    .find();
    
    if(req.query.sabor)
        prod.filter({ sabor: req.query.sabor });


    prod.toArray((err, result) => {
            console.log('hola servidor')
            res.render('index', {
                helado: result
            });
        })
});
