import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Layout } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminSideNav from "../../../Components/navbar/AdminSideNav";
import { getProducts, delProduct } from "../../../functions/product";
import LinkedList from "ts-linked-list";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "title", label: "Title", minWidth: 150 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "left",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "brand",
    label: "Brand",
    minWidth: 60,
    align: "right",
  },
  {
    id: "color",
    label: "Color",
    minWidth: 60,
    align: "right",
  },
];

export const createData = (
  id,
  slug,
  title,
  description,
  price,
  quantity,
  brand,
  color
) => {
  return { id, slug, title, description, price, quantity, brand, color };
};

const { Header, Content } = Layout;

const ListProducts = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = async (slug) => {
    if (window.confirm(`Are you sure you want to delete ${slug} Product `)) {
      delProduct(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.title} product deleted successfully`);
          loadAllProducts();
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts(page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // const rows = [];

  // products.map((p) =>
  //   rows.push(
  //     createData(
  //       `${p._id}`,
  //       `${p.slug}`,
  //       `${p.title}`,
  //       `${p.description.slice(0, 30)}`,
  //       `${p.price}`,
  //       `${p.quantity}`,
  //       `${p.brand}`,
  //       `${p.color}`
  //     )
  //   )
  // );
  const list = new LinkedList();
  products.map((p) =>
    list.push(
      createData(
        `${p._id}`,
        `${p.slug}`,
        `${p.title}`,
        `${p.description.slice(0, 30)}`,
        `${p.price}`,
        `${p.quantity}`,
        `${p.brand}`,
        `${p.color}`
      )
    )
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSideNav />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
          All prodcuts
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {loading ? (
              <>
                {" "}
                <CircularProgress />
                <CircularProgress color="secondary" />
              </>
            ) : (
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell key={1122} style={{ minWidth: 90 }}>
                          Edit
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {list
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((lst) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={lst.id}
                            >
                              <DeleteIcon
                                onClick={() => handleClick(lst.slug)}
                              />

                              <EditIcon />

                              {columns.map((column) => {
                                const value = lst[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={list.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ListProducts;
