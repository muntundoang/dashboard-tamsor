import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { store } from "../../../store";
import useMediaQuery from "@mui/material/useMediaQuery";

const CreateCategory = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {createCategoryList} = store(state => state)

  const handleFormSubmit = async (values) => {
    const obj = {
      ...values,
    };
    try {
      const respond = await createCategoryList(obj)
      console.log('respond di create Category => ', respond)
    } catch (error) {
      console.log("error di createProduct ==>", error);
    }
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
              label="Category Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helpertext={touched.name && errors.name}
              sx={{ gridColumn: "span 4", alignItems: "center" }}
            />

            <Box
              id="button"
              name="button"
              display="block"
              justifyContent="left"
              sx={{ gridColumn: "span 2" }}
            >
              <Button type="submit" color="secondary" variant="contained">
                Create Category
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
};

export default CreateCategory;
