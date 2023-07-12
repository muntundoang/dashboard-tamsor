import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Autocomplete,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState, useEffect } from "react";
import { store } from "../../../store";

const AddStockItem = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [brandValue, setBrandValue] = useState("");
  const {
    categoryList,
    getCategoryList,
    stockList,
    getProductList,
    brandList,
    addStockProduct,
  } = store((state) => state);
  const listCategory = categoryList.map((item) => (
    <MenuItem key={`category-${item.id}`} value={item.id}>
      {item.name}
    </MenuItem>
  ));

  const handleFormSubmit = async (values) => {
    const obj = {
      ...values,
      brand: brandValue,
    };
    console.log(obj);
    try {
      const respond = await addStockProduct(obj);
      console.log(respond);
    } catch (error) {
      console.log("error di createProduct ==>", error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await getCategoryList();
      } catch (error) {
        console.log("error di table product list ==> ", error);
      }
    };
    const fetchBrand = async () => {
      try {
        await getProductList();
      } catch (error) {
        console.log("error di table product list ==> ", error);
      }
    };
    if (categoryList.length <= 0) {
      fetch();
    }
    if (stockList.length <= 0) {
      fetchBrand();
    }
  }, []);

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            name="form"
            id="form"
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              id="name"
              variant="filled"
              type="text"
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helpertext={touched.name && errors.name}
              sx={{ gridColumn: "span 2", alignItems: "center" }}
            />
            <Box sx={{ gridColumn: "span 1" }}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  id="category"
                  value={values.categoryId}
                  label="Category"
                  name="categoryId"
                  placeholder="Category"
                  variant="filled"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.categoryId && !!errors.categoryId}
                  helpertext={touched.categoryId && errors.categoryId}
                >
                  {listCategory}
                </Select>
              </FormControl>
            </Box>
            <Stack spacing={2} sx={{ gridColumn: "span 1" }}>
              <Autocomplete
                freeSolo
                id="brand"
                name="brand"
                value={values.brand}
                inputValue={brandValue}
                onInputChange={(event, newInputValue) => {
                  setBrandValue(newInputValue);
                }}
                onBlur={handleBlur}
                options={brandList.map((option) => option)}
                renderInput={(params) => (
                  <TextField {...params} label="Brand" variant="filled" />
                )}
              />
            </Stack>
            <TextField
              fullWidth
              id="safetyStock"
              variant="filled"
              type="number"
              label="Safety Stock"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.safetyStock}
              name="safetyStock"
              error={!!touched.safetyStock && !!errors.safetyStock}
              helpertext={touched.safetyStock && errors.safetyStock}
              sx={{ gridColumn: "span 1", alignItems: "center" }}
            />
            <TextField
              fullWidth
              id="currentStock"
              variant="filled"
              type="number"
              label="Current Stock"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.currentStock}
              name="currentStock"
              error={!!touched.currentStock && !!errors.currentStock}
              helpertext={touched.currentStock && errors.currentStock}
              sx={{ gridColumn: "span 1", alignItems: "center" }}
            />
            <TextField
              fullWidth
              id="netPerPack"
              variant="filled"
              type="number"
              label="Net Weight Per Pack"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.netPerPack}
              name="netPerPack"
              error={!!touched.netPerPack && !!errors.netPerPack}
              helpertext={touched.netPerPack && errors.netPerPack}
              sx={{ gridColumn: "span 1", alignItems: "center" }}
            />
            <TextField
              fullWidth
              id="pricePerPack"
              variant="filled"
              type="number"
              label="Price Per Pack"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.pricePerPack}
              name="pricePerPack"
              error={!!touched.pricePerPack && !!errors.pricePerPack}
              helpertext={touched.pricePerPack && errors.pricePerPack}
              sx={{ gridColumn: "span 1", alignItems: "center" }}
            />
            <Box sx={{ gridColumn: "span 1" }}>
              <FormControl fullWidth>
                <InputLabel id="dimension-label">Dimension</InputLabel>
                <Select
                  id="dimension"
                  value={values.dimension}
                  label="Dimension"
                  name="dimension"
                  placeholder="dimension"
                  variant="filled"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.dimension && !!errors.dimension}
                  helpertext={touched.dimension && errors.dimension}
                >
                  <MenuItem value={"milliliter"}>Milliliter</MenuItem>
                  <MenuItem value={"gram"}>Gram</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: "span 3" }} />
            <Box display="block" sx={{ gridColumn: "span 2" }}>
              <Button type="submit" color="secondary" variant="contained">
                Create Product
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  name: "",
  categoryId: "",
  safetyStock: "",
  currentStock: "",
  brand: "",
  netPerPack: "",
  pricePerPack: "",
  dimension: "",
};

export default AddStockItem;
