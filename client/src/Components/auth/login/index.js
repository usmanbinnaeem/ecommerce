import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { auth, googleAuthProvider } from "../../../firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createOrUpdateUser } from "../../../functions/auth";
import "./Login.css";

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
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .min(8, "Password is too short.")
    .max(20, "Password is too long.")
    .required("Password is Required"),
});

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/history");
    }
  };

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);

  const loginWIthGoogle = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log("error in backend", err));
        // navigate("/");
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error.message);
      });
  };
  return (
    <div className="register__form">
      <h3>Login Into Your Account</h3>

      <div className={classes.root}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={async ({ email, password }, onSubmitProps) => {
            try {
              const result = await auth.signInWithEmailAndPassword(
                email,
                password
              );
              const { user } = result;
              const idTokenResult = await user.getIdTokenResult();
              createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                  dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                      name: res.data.name,
                      email: res.data.email,
                      token: idTokenResult.token,
                      role: res.data.role,
                      _id: res.data._id,
                    },
                  });
                  roleBasedRedirect(res);
                })
                .catch((err) => console.log("error in backend", err));

              navigate("/");
            } catch (error) {
              console.log("error", error);
              toast.error(error.message);
            }

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
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        helperText={<ErrorMessage name="email" />}
                        variant="standard"
                        required
                        label="Email Address"
                        name="email"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        helperText={<ErrorMessage name="password" />}
                        variant="standard"
                        required
                        label="Password"
                        name="password"
                        type="password"
                      />
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        Login with Email Address
                      </Button>
                    </Grid>
                    OR
                    <Grid item xs={12}>
                      <Button
                        onClick={() => loginWIthGoogle()}
                        variant="contained"
                        color="secondary"
                      >
                        Login with Google Account
                      </Button>
                    </Grid>
                    <Link to="/forgot/password">Forgot Password</Link>
                  </Grid>
                </Form>
              </Grid>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
