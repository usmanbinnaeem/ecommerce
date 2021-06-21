import { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
});

const ForogtPassword = () => {
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
      <h3>Forget Your Password</h3>

      <div className={classes.root}>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={async ({ email }, onSubmitProps) => {
            const config = {
              url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
              handleCodeInApp: true,
            };

            await auth
              .sendPasswordResetEmail(email, config)
              .then(() => {
                toast.success("Check your Email for Password reset link");
              })
              .catch((error) => {
                console.log("error", error);
                toast.error(error.message);
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
                        Forget Passowrd
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

export default ForogtPassword;
