'use strict';

let express = require('express');
let app = express();

require('./app/config')(app);

require('./app/models');

require('./app/config/passport');

require('./app/routers')(app);

let port = process.env.PORT || 3001;

app.listen(port, () => console.log(`App running at port ${port}`));
