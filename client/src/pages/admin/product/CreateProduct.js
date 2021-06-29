import { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { Layout } from "antd";
import { useSelector } from "react-redux";
import AdminSideNav from "../../../Components/navbar/AdminSideNav";
import { getCategories, getSubcategories } from "../../../functions/category";
import { createProduct } from "../../../functions/product";
import ProductForm from "../../../Components/form/ProductForm";

const { Header, Content } = Layout;

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export const productSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too short.")
    .max(32, "Too long.")
    .required("Category Name is Required"),
  description: Yup.string()
    .min(20, "Too short.")
    .max(2000, "Too long.")
    .required("Category Name is Required"),
});

const AddProduct = () => {
  const classes = useStyles();
  const { user } = useSelector((state) => ({ ...state }));

  const [ship, setShip] = useState("");
  const [col, setCol] = useState("");
  const [brnd, setBrnd] = useState("");
  const brands = [
    "Apple",
    "Accer",
    "Lenovo",
    "Microsoft",
    "Hp",
    "Dell",
    "Haier",
    "Asus",
  ];
  const colors = ["Black", "Brown", "Blue", "White", "Gray"];
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [prntCategory, setPrntCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleChange = (event) => {
    // console.log(event.target.name, "  --------  ", event.target.value);
    setShip(event.target.value);
  };

  const handleCategory = (event) => {
    // console.log(" CLICKED CATEGORY ", event.target.value);
    setPrntCategory(event.target.value);
    getSubcategories(event.target.value).then((res) => {
      // console.log("SUBCATEGORIES ", res.data);
      setSubCategories(res.data);
    });
    setShowSub(true);
  };

  const handleSub = (event) => {
    setSubCategory(event.target.value);
  };

  const handleColor = (event) => {
    // console.log(event.target.name, "  --------  ", event.target.value);
    setCol(event.target.value);
  };

  const handleBrand = (event) => {
    // console.log(event.target.name, "  --------  ", event.target.value);
    setBrnd(event.target.value);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSideNav />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
          Create Products
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div className={classes.root}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <Formik
                  initialValues={{
                    title: "",
                    description: "",
                    price: "",
                    quantity: "",
                  }}
                  validationSchema={productSchema}
                  onSubmit={async (
                    { title, description, price, quantity },
                    onSubmitProps
                  ) => {
                    createProduct(
                      {
                        title,
                        description,
                        price,
                        quantity,
                        shipping: ship,
                        color: col,
                        brand: brnd,
                        category: prntCategory,
                        subcategory: subCategory,
                        images: images,
                      },
                      user.token
                    )
                      .then((res) => {
                        console.log("res --------------- ", res);
                        toast.success(
                          `${res.data.title} is created Successfully`
                        );
                        window.location.reload();
                      })
                      .catch((err) => {
                        console.log("error in creating product", err);
                        toast.error(err.response.data.err);
                      });
                    onSubmitProps.resetForm();
                  }}
                >
                  {(formik) => (
                    <>
                        <ProductForm
                          ship={ship}
                          handleChange={handleChange}
                          col={col}
                          handleColor={handleColor}
                          colors={colors}
                          brnd={brnd}
                          handleBrand={handleBrand}
                          brands={brands}
                          categories={categories}
                          handleCategory={handleCategory}
                          prntCategory={prntCategory}
                          subCategories={subCategories}
                          showSub={showSub}
                          handleSub={handleSub}
                          subCategory={subCategory}
                          images={images}
                          setImages={setImages}
                          loading={loading}
                          setLoading={setLoading}
                        />
                    </>
                  )}
                </Formik>
              </Grid>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddProduct;
