const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/coffeeRatingDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((error) => console.log(error));

const coffeeSchema = new mongoose.Schema({
    name: String,
    price: Number,
    votes: {
        type: Number,
        default: 0
    }
});

const Coffee = mongoose.model("Coffee", coffeeSchema);

app.get("/api/coffees", async (req, res) => {
    const coffees = await Coffee.find();
    res.json(coffees);
});

app.post("/api/coffees", async (req, res) => {
    const coffee = new Coffee(req.body);
    await coffee.save();
    res.json(coffee);
});

app.put("/api/coffees/:id/vote", async (req, res) => {
    const coffee = await Coffee.findByIdAndUpdate(
        req.params.id,
        { $inc: { votes: 1 } },
        { new: true }
    );

    res.json(coffee);
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});