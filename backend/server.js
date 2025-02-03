require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT=process.env.PORT || 3001;

const errorMiddleware=require('./middlewares/errorHandler');

const auth=require('./routes/auth.route');
const permissions=require('./routes/permissions.route');
const role=require('./routes/roles.route');

const superAdmin=require('./routes/superAdmin.route');
const viewer=require('./routes/viewer.route');
const admin=require('./routes/admin.route');
const therapist=require('./routes/therapist.route');

const cors=require('cors');
const { verifyRole } = require('./middlewares/authMiddleware');

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from frontend
    credentials: true, // Allow cookies if needed
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    return res.json({'Hello, World!':"dj"});
});

app.use("/auth",auth);
app.use('/permissions',permissions)
app.use("/roles",role);

app.use("/super-admin",verifyRole(["SUPER_ADMIN"]),superAdmin)
app.use('/viewer',verifyRole(["SUPER_ADMIN","VIEWER"]),viewer);
app.use("/admin",verifyRole(["SUPER_ADMIN","ADMIN"]),admin);
app.use("/therapist",verifyRole(["SUPER_ADMIN","THERAPIST"]),therapist);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});