const mongoose = require("mongoose");
const express = require("express");
const app = express();
const clients = require("./routers/clients");
const admins = require("./routers/admins");
const projets = require("./routers/projets");
const reclamations = require("./routers/reclamations");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv").config();
const cors = require("cors");
const invoices = require("./routers/invoices");
const bills = require("./routers/bills");
const products = require("./routers/products");

db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dc7cb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    name: "sessionId",
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use("/images", express.static("images"));

app.use("/clients", clients);
app.use("/admins", admins);
app.use("/projets", projets);
app.use("/reclamations", reclamations);
app.use("/invoices", invoices);
app.use("/products", products);
app.use("/bills", bills);

const port = process.env.PUBLIC_URL || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
