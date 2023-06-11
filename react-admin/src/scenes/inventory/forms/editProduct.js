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
  
  const EditProduct = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [brandValue, setBrandValue] = useState("");
    const {
      categoryList,
      getCategoryList,
      editProduct,
      brandList,
      postEditProduct
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
        id: editProduct.id
      };
      console.log('obj ==> ', obj);
      try {
        const respond = await postEditProduct(obj)
        // const respond = await addStockProduct(obj)
        console.log(respond)
      } catch (error) {
        console.log("error di createProduct ==>", error);
      }
    };

    useEffect(() => {
      const fetchCategory = async () => {
        try {
          if(categoryList.length === 0){
            await getCategoryList();
          }
        } catch (error) {
          console.log("error di edit product ==> ", error);
        }
      };
      fetchCategory();
    }, []);

    console.log('editProduct ===> ', editProduct)

    const initialValues = {
      name: editProduct.name,
      categoryId: editProduct.categoryId,
      safetyStock: editProduct.safetyStock,
      currentStock: editProduct.currentStock,
      brand: editProduct.brand,
      netPerPack: editProduct.netPerPack,
      pricePerPack: editProduct.pricePerPack,
      dimension: editProduct.dimension,
      isActive: editProduct.isActive
    };
  
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
                  <InputLabel id="category-label" sx={{position: "absolute", marginTop: "12px"}}>
                    Category
                  </InputLabel>
                  <Select
                    id="category"
                    defaultValue={""}
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
                    if(event){
                      event.preventDefault();
                    }
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
              <TextField disabled
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
                  <InputLabel id="dimension-label" sx={{position: "absolute", marginTop: "12px"}}>Dimension</InputLabel>
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
              <Box sx={{ gridColumn: "span 1" }}>
                <FormControl fullWidth>
                  <InputLabel id="isActive-label" sx={{position: "absolute", marginTop: "12px"}}>Product Status</InputLabel>
                  <Select
                    id="isActive"
                    value={values.isActive}
                    label="Product Status"
                    name="isActive"
                    placeholder="Product Status"
                    variant="filled"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.isActive && !!errors.isActive}
                    helpertext={touched.isActive && errors.isActive}
                  >
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Deacvtive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ gridColumn: "span 3" }} />
              <Box display="block" sx={{ gridColumn: "span 2" }}>
                <Button type="submit" color="secondary" variant="contained">
                  Edit Product
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    );
  };
  
  export default EditProduct;
  