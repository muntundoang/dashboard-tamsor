import { Box, Button, TextField, Select, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { defaultPhoto } from "../../data/default-photo";
import { useState } from "react";
import { store } from "../../store";

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [image, setImage] = useState(defaultPhoto);
  const {register} = store(state => state)

  const handleFormSubmit = async (values) => {
    const obj = {
      ...values,
      photo: image,
    };
    try {
      const data = await register(obj)
      console.log("data dari handleFormSubmit ==>", data)
    } catch (error) {
      console.log("error di handleFormSubmit ==>", error)
    }
  };

  const handlePhoto = (e) => {
    const selectedfile = e.target.files[0];
    if(selectedfile){
      const data = new FileReader();
      data.addEventListener("load", () => {
        setImage(data.result);
      });
      data.readAsDataURL(selectedfile);
    } else {
      setImage(defaultPhoto)
    }
  };

  return (
    <Box>
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
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
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helpertext={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helpertext={touched.password && errors.password}
                sx={{ gridColumn: "span 1" }}
              />
              <Select
                id="role"
                value={values.role}
                label="Role"
                name="role"
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.role && !!errors.role}
                helpertext={touched.role && errors.role}
                sx={{ gridColumn: "span 1" }}
              >
                <MenuItem value={"manager"}>Manager</MenuItem>
                <MenuItem value={"kitchen"}>Kitchen</MenuItem>
                <MenuItem value={"bar"}>Bar</MenuItem>
              </Select>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helpertext={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helpertext={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helpertext={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helpertext={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birthday}
                name="birthday"
                error={!!touched.birthday && !!errors.birthday}
                helpertext={touched.birthday && errors.birthday}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Photo"
                name="photo"
                onBlur={handleBlur}
                onChange={handlePhoto}
                sx={{ gridColumn: "span 2" }}
              />
              <Box
                display="flex"
                alignItems="center"
                sx={{ gridColumn: "span 2" }}
              >
                <img
                  alt="profile-user"
                  width="160px"
                  height="240px"
                  src={image}
                />
              </Box>
              <Box
                display="block"
                justifyContent="left"
                mt="30px"
                sx={{ gridColumn: "span 2" }}
              >
                <Button type="submit" color="secondary" variant="contained">
                  Create New User
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  name: yup.string().required("required"),
  password: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  birthday: yup.date().required("required"),
  photo: yup.string(),
  role: yup.string("admin", "kitchen", "bar", "manager").required("required")
});
const initialValues = {
  username: "",
  name: "",
  password: "",
  email: "",
  contact: "",
  address: "",
  birthday: "",
  photo: "",
  role: "",
};

export default Register;
