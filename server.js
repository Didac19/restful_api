const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.set('port', process.env.PORT || 4000);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/v1/users', require('./api/v1/routes/users.routes'));
app.use('/api/v1/articles', require('./api/v1/routes/articles.routes'));
app.use('/api/v1/categories', require('./api/v1/routes/categories.routes'));

// app.get('/', (req, res) => {
//     res.send({title: 'Hello adso!'})
// })


app.listen(app.get('port'), () => {
    console.log(`server running on http://localhost:${app.get('port')}/api/v1/`);
});
