import categoryModels from "../models/categoryModels.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is required",
      });
    }
    const existingCategory = await categoryModels.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already Exists",
      });
    }

    const category = await new categoryModels({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in category",
    });
  }
};

//Update Category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModels.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      message: "Error while updating",
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModels.find({});
    res.status(200).send({
      success: true,
      message: "All Category List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all category",
    });
  }
};

//Single Category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModels.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single category successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false.error,
      messge: "Error while getting single category",
    });
  }
};

//Delete Category
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModels.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      messge: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messge: "Error in Deleting category",
      error,
    });
  }
};
