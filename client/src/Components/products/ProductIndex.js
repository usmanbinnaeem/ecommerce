import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import products from "../../assets/Products/products";
import {Link} from 'react-router-dom'
import "./Products.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const ProductIndex = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {Object.entries(products).map(([slug, { name, img }]) => (
          <Grid item xs={3} key={slug}>
            <Link to = {`/products/${slug}`}>
              <h2>{name}</h2>
              <img className = "product__image" src={img} alt={name} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductIndex;
