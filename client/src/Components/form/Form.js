import { Field, Form, ErrorMessage } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    paper: {
        margin: theme.spacing(1),
        width: "100%",
        flexGrow: 1,
    },
    field: {
        maxWidth: 360,
    },
}));


const CategoriesForm = () => {
    const classes = useStyles();
    return (

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

    )
}

export default CategoriesForm