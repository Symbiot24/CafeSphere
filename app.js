const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

const User = require("./models/user");
const Cafeowner = require("./models/cafeowner");
const Cafe = require("./models/cafe");
const ExpressError = require("./utils/ExpressError");

// Database connection
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Cafesphere");
}
main()
    .then(() => console.log("Database connection successful"))
    .catch((err) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly: true,
    },
};
app.use(session(sessionOptions));
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use("user-local", new LocalStrategy(User.authenticate()));
passport.use("cafeowner-local", new LocalStrategy(Cafeowner.authenticate()));

passport.serializeUser((user, done) => {
    done(null, { id: user.id, entity: user.entity });
});

passport.deserializeUser(async (user, done) => {
    try {
        let model;
        if (user.entity === "user") {
            model = await User.findById(user.id);
        } else if (user.entity === "cafeowner") {
            model = await Cafeowner.findById(user.id);
        }
        done(null, model);
    } catch (err) {
        done(err);
    }
});

// Flash messages
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
const aboutRoute = require("./routes/about");
const contactRoute = require("./routes/contact");
const cafeRoute = require("./routes/cafe");
const userRoute = require("./routes/user");

app.use("/about", aboutRoute);
app.use("/contact", contactRoute);
app.use("/cafe", cafeRoute);
app.use("/", userRoute);

app.get("/", async (req, res) => {
    const cafes = await Cafe.find({});
    res.render("pages/index", { cafes });
});

// Error handling
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!!"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("pages/error", { message });
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
