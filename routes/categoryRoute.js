import { Router } from "express";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";
import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

const router = new Router();

router
  .route("/create-category")
  .post(protectedRoutes, isAdmin, async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(401).send({ message: "Name is required" });
      }
      const existingCategory = await categoryModel.findOne({ name });
      if (existingCategory) {
        res
          .status(200)
          .send({ success: true, message: "Category already exist" });
      }
      const category = await new categoryModel({
        name,
        slug: slugify(name),
      }).save();
      res.status(201).send({
        success: true,
        message: "New category Created",
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
  });

router
  .route("/update-category/:id")
  .post(protectedRoutes, isAdmin, async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Category updated Successfully",
        category,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        success: false,
        e,
        message: "Error in updating category",
      });
    }
  });

router.route("/get-category").get(async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error in getting all category",
    });
  }
});

router.route("/single-category/:slug").get(async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Category",
      category,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      e,
      message: "Error in getting category",
    });
  }
});

router
  .route("/delete-category/:slug")
  .get(protectedRoutes, isAdmin, async (req, res) => {
    try {
      const category = await categoryModel.deleteOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Deleted Successfully",
        category,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        success: false,
        e,
        message: "Error in deleting category",
      });
    }
  });

export default router;
