const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const Item = require("../model/Item");

// set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/assets/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const router = Router();

// routes
// Landing page route
router.get("/", (req, res, next) => {
  try {
    return res.status(200).render("index");
  } catch (error) {
    next(error);
  }
});

// Home route
router.get("/home", async (req, res, next) => {
  try {
    const items = await Item.find();
    return res.status(200).render("home", {
      items,
      search: null,
    });
  } catch (error) {
    next(error);
  }
});

// Home route
router.get("/add", (req, res, next) => {
  try {
    return res.status(200).render("add", {
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// Home route
router.get("/about", (req, res, next) => {
  try {
    return res.status(200).render("about");
  } catch (error) {
    next(error);
  }
});

// post request routes
// add route
router.post("/add", upload.single("item_image"), async (req, res, next) => {
  try {
    if (!req.body.item_name || !req.body.item_price || !req.body.item_cat) {
      return res.status(401).render("add", {
        error: "Credentials are required!",
      });
    }

    await Item.create({
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_image: req.file.filename,
      item_cat: req.body.item_cat,
    })
      .then(() => {
        return res.status(302).redirect("/home");
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  } catch (error) {
    next(error);
  }
});

// search
router.get("/search", async (req, res, next) => {
  try {
    const search = await Item.find({ item_cat: req.query.cat });
    return res.status(200).render("home", {
      search,
    });
  } catch (error) {
    next(error);
  }
});

// page not found
router.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = router;
