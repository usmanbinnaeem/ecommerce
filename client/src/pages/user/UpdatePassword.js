import { Layout } from "antd";
import UserSideNav from "../../Components/navbar/UserSideNav";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

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

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password is too short.")
    .max(20, "Password is too long.")
    .required("Password is Required"),
});

const UpdatePassword = () => {
  const classes = useStyles();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <UserSideNav />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
          Update Password
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div className={classes.root}>
              <Formik
                initialValues={{
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={async ({ password }, onSubmitProps) => {
                  await auth.currentUser
                    .updatePassword(password)
                    .then(() => {
                      toast.success("Password Updated");
                    })
                    .catch((err) => {
                      toast.error(err.message);
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
                      <Form className={classes.paper} autoComplete="off">
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          spacing={3}
                        >
                          <Grid item xs={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              helperText={<ErrorMessage name="password" />}
                              variant="standard"
                              required
                              label="Enter New Password"
                              name="password"
                              type="password"
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              Update Password
                            </Button>
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

export default UpdatePassword;
