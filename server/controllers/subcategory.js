const SubCategory = require("../model/subcategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subCategory = await new SubCategory({ name, parent, slug: `${slugify(name)}-${Math.random()}` }).save();
    res.json(subCategory);
  } catch (err) {
    res.status(400).send("Subcategory already exist"); 
  }
};

exports.read = async (req, res) => {
  const subCategory = await SubCategory.findOne({ slug: req.params.slug }).exec();
  res.json(subCategory);
};

exports.list = async (req, res) => {
  const subCatList = await SubCategory.find({}).sort({ createdAt: -1 }).exec();
  res.json(subCatList);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log("update", err);
    res.status(400).send("Update subcategory failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Delete subcategory failed");
  }
};
