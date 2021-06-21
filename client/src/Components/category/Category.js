import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import categoryImage from "../../assets/Category/categoryImage";
import "./Category.css"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

const Category = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {categoryImage.map((img, i) => (
          <Grid item xs={3} key = {img + i}>
            <img className = "category__image" src={img} alt="" />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Category;
