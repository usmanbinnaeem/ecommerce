import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { updateCategory } from "../../../functions/category";
import { Layout } from "antd";
import AdminSideNav from "../../../Components/navbar/AdminSideNav";
const { Header, Content } = Layout;

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(1),
    width: 150,
    flexGrow: 1,
  },
}));

export const categorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short.")
    .max(32, "Too long.")
    .required("Category Name is Required"),
});

const UpdateCategory = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { user } = useSelector((state) => ({ ...state }));
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSideNav />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
          Categories
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
                  updateCategory(slug, { name }, user.token)
                    .then((res) => {
                      toast.success(`${res.data.name} is updated successfully`);
                      navigate("/admin/category");
                    })
                    .catch((err) => {
                      if (err.response.status === 4000) {
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
                      <Form className={classes.paper} autoComplete = "off">
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          spacing={3}
                        >
                          <Grid item xs={6}>
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
                                Update
                              </Button>
                            </div>
                          </Grid>
                        </Grid>
                      </Form>
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

export default UpdateCategory;
