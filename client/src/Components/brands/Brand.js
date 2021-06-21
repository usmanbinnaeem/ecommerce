import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import brandImages from "../../assets/Brand/brandImages";
import "./brand.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Brand = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {brandImages.map(({ name, brandId, image, desc }) => (
          <Grid item xs={4} key={brandId}>
            <Typography variant="h3" component="h2">
              {name}
            </Typography>

            <img className="brand__image" src='https://picsum.photos/200/300' alt="" />
            <Typography variant="h5" component="h2">
              {desc}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Brand;
// brandImages.map((imgg, i) => (
//   <Grid xs={4} key = {imgg + i}>
//     <img className = "brand__image" src={imgg} alt="" />
//   </Grid>
// ))
