import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import "./Register.css";

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

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(4, "First Name is too Short!")
    .max(20, "First Name is too Long!")
    .required("First Name is Required"),
  lastName: Yup.string()
    .min(4, "Last Name is too Short!")
    .max(20, "Last Name is too Long!")
    .required("Last Name is Required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string()
    .min(8, "Password is too short.")
    .max(20, "Password is too long.")
    .required("Password is Required"),
});

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="register__form">
      <h3>Create Your Account</h3>
      <p style={{ color: "red" }}>fields with * are required</p>

      <div className={classes.root}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (
            { firstName, lastName, email, password },
            onSubmitProps
          ) => {
            // console.log("values", firstName, lastName, email, password);
            const config = {
              url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
              handleCodeInApp: true,
            };

            // sending email to validate
            await auth.sendSignInLinkToEmail(email, config);

            // a popup
            toast.success(
              `Email is sent to ${email} check you inbox to verify your email`
            );

            // save user data in local storage
            window.localStorage.setItem("firstNameForRegistration", firstName);
            window.localStorage.setItem("lastNameForRegistration", lastName);
            window.localStorage.setItem("emailForRegistration", email);
            window.localStorage.setItem("passwordForRegistration", password);

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
                        helperText={<ErrorMessage name="firstName" />}
                        variant="standard"
                        required
                        label="First Name"
                        name="firstName"
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        helperText={<ErrorMessage name="lastName" />}
                        variant="standard"
                        required
                        label="Last Name"
                        name="lastName"
                        type="text"
                      />
                    </Grid>
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
                        Register
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
  );
};

export default Register;
