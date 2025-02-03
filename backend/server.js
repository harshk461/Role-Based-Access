require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT=process.env.PORT || 3001;

const errorMiddleware=require('./middlewares/errorHandler');

const auth=require('./routes/auth.route');
const superAdmin=require('./routes/superAdmin.route');
const permissions=require('./routes/permissions.route');
const role=require('./routes/roles.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    return res.json({'Hello, World!':"dj"});
});

app.use("/auth",auth);
app.use("/super-admin",superAdmin)
app.use('/permissions',permissions)
app.use("/roles",role);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});