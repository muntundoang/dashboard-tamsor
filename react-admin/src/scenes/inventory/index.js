import { Box, Button, ButtonGroup } from "@mui/material";
// import useMediaQuery from "@mui/material/useMediaQuery";
import CategoryList from "./table/category-list";
import ProductList from "./table/product-list";
import EditCategory from "./forms/editCategory";
import Header from "../../components/Header";
import StockOpname from "./table/stock-table";
import CreateCategory from "./forms/createCategory";
import AddStockItem from "./forms/createProduct";
import EditProduct from "./forms/editProduct";
import { store } from "../../store";
import { useState } from "react";

const Inventory = () => {
  const [form, setForm] = useState("stock opname");
  const [categoryId, setCategoryId] = useState(null);
  const [name, setName] = useState(null);
  const { setEditProduct } = store(state => state)

  const changeForm = (event, val, id, name, type) => {
    event.preventDefault();
    switch (type) {
      case "category":
        if (id && name) {
          setCategoryId(id);
          setName(name);
          console.log("id ==>", id);
          console.log("categoryName ==>", name);
          setForm(val);
        }
        break;

      case "product":
        if (id) {
          setEditProduct(id)
          console.log("id ==>", id);
          setForm(val);
        }
        break;

      default:
        setForm(val);
    }
  };

  return (
    <Box>
      <Header title="INVENTORYS" subtitle="Inventory Control Page" />
      <Box margin={"20px"} marginLeft={"0px"}>
        <ButtonGroup
          variant="outlined"
          color="secondary"
          aria-label="outlined button group"
        >
          <Button onClick={(e) => changeForm(e, "stock opname")}>
            Stock Opname
          </Button>
          <Button onClick={(e) => changeForm(e, "category")}>
            Categories
          </Button>
          <Button onClick={(e) => changeForm(e, "create product")}>
            Create Product
          </Button>
          <Button onClick={(e) => changeForm(e, "inventory")}>
            Product Control
          </Button>
        </ButtonGroup>
      </Box>
      {form === "category" && (
        <>
          <CreateCategory />
          <CategoryList changeForm={changeForm} />
        </>
      )}
      {form === "inventory" && <ProductList changeForm={changeForm}/>}
      {form === "create product" && <AddStockItem />}
      {form === "edit category" && (
        <EditCategory initName={name} id={categoryId} />
      )}
      {form === "edit product" && <EditProduct/>}
      {form === "stock opname" && <StockOpname/>}
    </Box>
  );
};

export default Inventory;
