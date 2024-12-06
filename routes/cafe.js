const express = require("express");
const router = express.Router();
const Cafe = require("../models/cafe");
const wrapAsync = require("../utils/wrapAsync");
const { cafeSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

// Middleware
const isOwnerLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in first");
        return res.redirect("/login");
    }
    if (req.user.entity !== "cafeowner") {
        req.flash("error", "You must create an Owner ID first");
        return res.redirect("/signup");
    }
    next();
};

const validateCafe = (req, res, next) => {
    const { error } = cafeSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

// Routes
router.get("/new", isOwnerLogin, (req, res) => {
    res.render("pages/addCafe");
});

router.post("/new", isOwnerLogin, validateCafe, wrapAsync(async (req, res) => {
    const newCafe = new Cafe(req.body);
    await newCafe.save();
    req.flash("success", "Cafe added successfully");
    res.redirect("/");
}));

router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const cafe = await Cafe.findById(id);
    res.render("pages/show", { cafe });
}));

router.get("/:id/edit", isOwnerLogin, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const cafe = await Cafe.findById(id);
    res.render("pages/edit", { cafe });
}));

router.put("/:id", isOwnerLogin, validateCafe, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Cafe.findByIdAndUpdate(id, { ...req.body });
    req.flash("success", "Cafe updated successfully");
    res.redirect(`/cafe/${id}`);
}));

module.exports = router;