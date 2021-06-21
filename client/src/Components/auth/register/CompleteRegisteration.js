import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { useStyles } from "./index";
import { useNavigate } from "react-router-dom";
import {createOrUpdateUser} from "../../../functions/auth"

const RegisterComplete = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstN, setFirstN] = useState("");
  const [lastN, setLastN] = useState("");

  useEffect(() => {
    setFirstN(window.localStorage.getItem("firstNameForRegistration"));
    setLastN(window.localStorage.getItem("lastNameForRegistration"));
    setEmail(window.localStorage.getItem("emailForRegistration"));
    setPassword(window.localStorage.getItem("passwordForRegistration"));
  }, []);

  const handleClick = async () => {
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("firstNameForRegistration");
        window.localStorage.removeItem("lastNameForRegistration");
        window.localStorage.removeItem("emailForRegistration");
        window.localStorage.removeItem("passwordForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        await user.updateProfile({
          displayName: `${firstN} ${lastN}`,
        });
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            console.log("response ", res);
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
          })
          .catch(err => console.log("error in backend", err));
        // redirect
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="register__form">
      <div className={classes.root}>
        <div>
          <strong>Name: {firstN + " " + lastN}</strong>
        </div>
        <div>
          <strong>Email: {email}</strong>
        </div>
        <div>
          <strong>Password: {password}</strong>
        </div>
      </div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Button
            onClick={() => {
              handleClick();
            }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterComplete;
