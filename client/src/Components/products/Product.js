import { Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <h2>Products</h2>
      <Outlet/>
    </div>
  );
};

export default Products;
