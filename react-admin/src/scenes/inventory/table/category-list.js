import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { store } from "../../../store";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../components/Header";

const CategoryList = ({ changeForm }) => {
  const { categoryList, deleteCategoryList, getCategoryList } = store(
    (state) => state
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "left",
      cellClassName: "action-column--cell",
      renderCell: ({ row: { id, name } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="left"
            gap="50px"
            borderRadius="4px"
          >
            <Box
              backgroundColor="yellow"
              borderRadius="4px"
              width={'80px'}
              sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
            >
              <Button onClick={(e) => changeForm(e, "edit category", id, name, 'category')} sx={{width: '100%'}}>
                <EditIcon sx={{ marginRight: "5px" }} />
                Edit
              </Button>
            </Box>
            <Box
              backgroundColor="red"
              borderRadius="4px"
              width={'80px'}
              sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
            >
              <Button onClick={(e) => deleteCategoryList(e, id)}>
                <DeleteIcon sx={{ marginRight: "5px" }} />
                Delete
              </Button>
            </Box>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        await getCategoryList();
      } catch (error) {
        console.log("error di table category list ==> ", error);
      }
    };
    fetchCategory();
  }, []);

  return (
    <Box marginTop={"20px"}>
      <Header title="Category List" subtitle="" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={categoryList} columns={columns} />
      </Box>
    </Box>
  );
};

export default CategoryList;
