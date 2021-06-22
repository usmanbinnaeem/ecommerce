import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Search from "../../../Components/search";
import {
  createCategory,
  getCategories,
  delCategory,
} from "../../../functions/category";
import { Layout } from "antd";
import AdminSideNav from "../../../Components/navbar/AdminSideNav";
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
    // maxWidth: 360,
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
}));

export const categorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short.")
    .max(32, "Too long.")
    .required("Category Name is Required"),
});

const AddCategory = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };

  const handleClick = async (slug) => {
    if (window.confirm(`Are you sure you want to delete ${slug} category `)) {
      delCategory(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} category deleted successfully`);
          loadcategories();
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
          Create Categories
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div className={classes.root}>
              <Formik
                initialValues={{
                  name: "",
                }}
                validationSchema={categorySchema}
                onSubmit={async ({ name }, onSubmitProps) => {
                  // console.log(name);
                  createCategory({ name }, user.token)
                    .then((res) => {
                      toast.success(`${res.data.name} is created Successfully`);
                      loadcategories();
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
                  <div className={classes.root}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item xs={6}>
                        <Form className={classes.paper} autoComplete="off">
                          <Field
                            className={classes.field}
                            as={TextField}
                            fullWidth
                            helperText={<ErrorMessage name="name" />}
                            variant="standard"
                            required
                            label="Category Name"
                            name="name"
                            type="text"
                          />
                          <br />
                          <br />
                          <div>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              Create
                            </Button>
                          </div>
                        </Form>
                      </Grid>
                      <Grid item xs={6}>
                        <Search keyword={keyword} setKeyword={setKeyword} />
                        <List className={classes.lroot}>
                          {categories.filter(searched(keyword)).map((cat) => {
                            return (
                              <ListItem
                                key={cat._id}
                                role={undefined}
                                dense
                                button
                              >
                                <ListItemText id={cat._id} primary={cat.name} />
                                <ListItemSecondaryAction>
                                  <Link to={`/admin/category/${cat.slug}`}>
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
                                    onClick={() => handleClick(cat.slug)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            );
                          })}
                        </List>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AddCategory;
