const Category = require("../model/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send("category already exist");
  }
};

exports.read = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};

exports.list = async (req, res) => {
  const catList = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(catList);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log("update", err);
    res.status(400).send("Update category failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Delete category failed");
  }
};
