import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Search from "../../../Components/search";
import { getCategories } from "../../../functions/category";
import {
  createSubCategory,
  getSubCategories,
  delSubCategory,
} from "../../../functions/subcategory";
import SelectParent from "./SelectParent";
import { Layout } from "antd";
import AdminSideNav from "../../../Components/navbar/AdminSideNav";
import CategoriesForm from "../../../Components/form/Form";
const { Header, Content } = Layout;

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(1),
    width: "100%",
    flexGrow: 1,
  },
  lroot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 400,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  field: {
    maxWidth: 360,
  },
  textItem: {
    backgroundColor: "gray",
    color: "white",
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    height: 40,
  },
  subItem: {
    backgroundColor: "#d3d3d3",
  },
}));

export const subCategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short.")
    .max(32, "Too long.")
    .required("Category Name is Required"),
});

const AddSubCategory = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [prntCategory, setPrntCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    loadcategories();
    loadSubCategories();
  }, []);

  const loadcategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const loadSubCategories = () => {
    getSubCategories().then((s) => setSubCategories(s.data));
  };

  const handleClick = async (slug) => {
    if (window.confirm(`Are you sure you want to delete ${slug} category `)) {
      delSubCategory(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} subcategory deleted successfully`);
          loadSubCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const { user } = useSelector((state) => ({ ...state }));
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSideNav />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
          Create Sub Categories
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
                    name: "",
                  }}
                  validationSchema={subCategorySchema}
                  onSubmit={async ({ name }, onSubmitProps) => {
                    createSubCategory(
                      { name, parent: prntCategory },
                      user.token
                    )
                      .then((res) => {
                        toast.success(
                          `${res.data.name} is created Successfully`
                        );
                        loadSubCategories();
                      })
                      .catch((err) => {
                        console.log("error in creating category", err);
                        if (err.response.status === 400) {
                          toast.error(err.response.data);
                        }
                      });
                    onSubmitProps.resetForm();
                  }}
                >
                  {(formik) => (
                    <Grid item xs={6}>
                      <div className={classes.paper}>
                        <SelectParent
                          categories={categories}
                          setPrntCategory={setPrntCategory}
                          prntCategory={prntCategory}
                        />
                      </div>
                      <CategoriesForm />
                    </Grid>
                  )}
                </Formik>

                <Grid item xs={6}>
                  <Search keyword={keyword} setKeyword={setKeyword} />
                  <List className={classes.lroot} subheader={<li />}>
                    {categories.map((par) => (
                      <li key={par._id} className={classes.listSection}>
                        <ul className={classes.ul}>
                          <ListSubheader className={classes.textItem}>
                            {par.name}
                          </ListSubheader>
                          {subCategories
                            .filter(searched(keyword))
                            .map((sub) => (
                              <div>
                                {sub.parent === par._id && (
                                  <ListItem
                                    className={classes.subItem}
                                    key={sub._id}
                                    role={undefined}
                                    dense
                                    button
                                  >
                                    <ListItemText
                                      id={sub._id}
                                      primary={sub.name}
                                    />
                                    <ListItemSecondaryAction>
                                      <Link
                                        to={`/admin/sub-category/${sub.slug}`}
                                      >
                                        <IconButton
                                          edge="end"
                                          aria-label="comments"
                                        >
                                          <EditIcon />
                                        </IconButton>
                                      </Link>
                                      <IconButton
                                        edge="end"
                                        aria-label="comments"
                                        onClick={() => handleClick(sub.slug)}
                                      >
                                        <DeleteIcon />
                                      </IconButton>
                                    </ListItemSecondaryAction>
                                  </ListItem>
                                )}
                              </div>
                            ))}
                        </ul>
                      </li>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddSubCategory;
