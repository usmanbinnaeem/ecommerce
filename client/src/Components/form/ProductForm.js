import { Field, Form, ErrorMessage } from "formik";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { useSelector } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CircularProgress from "@material-ui/core/CircularProgress";

export const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    maxWidth: 360,
  },
  field: {
    maxWidth: 360,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: "100%",
    maxWidth: 360,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  input: {
    display: "none",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const ProductForm = ({
  ship,
  handleChange,
  col,
  handleColor,
  colors,
  brnd,
  handleBrand,
  brands,
  categories,
  prntCategory,
  handleCategory,
  subCategories,
  showSub,
  handleSub,
  subCategory,
  images,
  setImages,
  loading,
  setLoading,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { user } = useSelector((state) => ({ ...state }));

  const uploadAndResizeFiles = (event) => {
    // console.log(event.target.files);
    let files = event.target.files;
    let allUploadedFiles = images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                // console.log("Image Upload response data", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setImages(allUploadedFiles);
              })
              .catch((err) => {
                console.log("CLOUDINARY UPLOAD ERROR", err);
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setImages(filteredImages);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Grid item xs={6}>
        <Form className={classes.paper} autoComplete="off">
          <Field
            className={classes.field}
            as={TextField}
            fullWidth
            helperText={<ErrorMessage name="title" />}
            variant="standard"
            required
            label="Title"
            name="title"
            type="text"
          />
          <Field
            className={classes.field}
            as={TextField}
            fullWidth
            helperText={<ErrorMessage name="description" />}
            variant="standard"
            required
            label="Add description"
            name="description"
            type="text"
            multiline
            rowsMax={4}
          />
          <Field
            className={classes.field}
            as={TextField}
            fullWidth
            helperText={<ErrorMessage name="price" />}
            variant="standard"
            required
            label="Enter Price"
            name="price"
            type="number"
          />
          <div>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleCategory}
                value={prntCategory}
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          {showSub && (
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">
                  Sub Category
                </InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  multiple
                  value={subCategory}
                  onChange={handleSub}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {subCategories.map((s) => (
                    <MenuItem
                      key={s._id}
                      value={s._id}
                      style={getStyles(s.name, subCategory, theme)}
                    >
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <div>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Shipping</InputLabel>
              <Select
                // name="shipping"
                value={ship}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
              >
                <MenuItem key={1} value="Yes">
                  Yes
                </MenuItem>
                <MenuItem key={2} value="No">
                  No
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <Field
            className={classes.field}
            as={TextField}
            fullWidth
            helperText={<ErrorMessage name="quantity" />}
            variant="standard"
            required
            label="Add Quantity"
            name="quantity"
            type="number"
          />
          <div>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Color</InputLabel>
              <Select
                // name="color"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={col}
                onChange={handleColor}
              >
                {colors.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                // name="brand"
                value={brnd}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleBrand}
              >
                {brands.map((b) => (
                  <MenuItem key={b} value={b}>
                    {b}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <br />
          <div>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={uploadAndResizeFiles}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<CloudUploadIcon />}
                component="span"
              >
                Upload Images
              </Button>
            </label>
          </div>

          <br />
          <div>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </div>
        </Form>
      </Grid>
      <Grid item xs={6}>
        <div>
          {loading ? (
            <>
              {" "}
              <CircularProgress />
              <CircularProgress color="secondary" />
            </>
          ) : (
            images.map((image) => (
              <Badge
                badgeContent={<HighlightOffIcon />}
                key={image.public_id}
                overlap="circle"
                onClick={() => handleRemove(image.public_id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  style={{ margin: "10px" }}
                  src={image.url}
                  alt="iamgee"
                  height="100"
                />
              </Badge>
            ))
          )}
        </div>
      </Grid>
    </>
  );
};

export default ProductForm;
