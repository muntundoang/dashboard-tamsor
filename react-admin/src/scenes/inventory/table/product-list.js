import { Box, useTheme, Button, Select, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { store } from "../../../store";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../../components/Header";

const ProductList = ({ changeForm }) => {
  const { stockList, getProductList, deleteStockList } = store((state) => state);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlerDeleteProduct = (e, id) => {
    if(e){
      e.preventDefault()
    }
    deleteStockList(id)
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      cellClassName: "category-column--cell",
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      cellClassName: "brand-column--cell",
    },
    {
      field: "needRestock",
      headerName: "Need Restock",
      flex: 1,
      cellClassName: "restock-column--cell",
    },
    {
      field: "safetyStock",
      headerName: "Safety Stock",
      flex: 1,
      cellClassName: "brand-column--cell",
    },
    {
      field: "currentStock",
      headerName: "Current Stock",
      flex: 1,
      cellClassName: "current-stock-column--cell",
    },
    {
      field: "netPerPack",
      headerName: "Net Weight / Pack",
      flex: 1,
      cellClassName: "netPerPack-column--cell",
    },
    {
      field: "pricePerPack",
      headerName: "Price / Pack",
      flex: 1,
      cellClassName: "pricePerPack-column--cell",
    },
    {
      field: "dimension",
      headerName: "Dimension",
      flex: 1,
      cellClassName: "dimension-column--cell",
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
            borderRadius="4px"
          >
            <Select
              sx={{
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
              }}
            >
              <MenuItem>
                <Box
                  backgroundColor="red"
                  borderRadius="4px"
                  width={"80px"}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button onClick={(e) => handlerDeleteProduct(e, id)}>
                    <DeleteIcon sx={{ marginRight: "5px" }} />
                    Delete
                  </Button>
                </Box>
              </MenuItem>
              <MenuItem>
                <Box
                  backgroundColor="yellow"
                  borderRadius="4px"
                  width={"80px"}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={(e) => changeForm(e, "edit product", id, name, 'product')}
                    sx={{ width: "100%" }}
                  >
                    <EditIcon sx={{ marginRight: "5px" }} />
                    Edit
                  </Button>
                </Box>
              </MenuItem>
            </Select>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        await getProductList();
      } catch (error) {
        console.log("error di table product list ==> ", error);
      }
    };
    if (stockList.length <= 0) {
      fetch();
    }
  }, []);

  return (
    <Box marginTop={"20px"}>
      <Header title="Product List" subtitle="" />
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
        <DataGrid rows={stockList} columns={columns} />
      </Box>
    </Box>
  );
};

export default ProductList;
