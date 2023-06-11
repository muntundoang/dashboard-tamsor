import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { store } from "../../../store";
import { useEffect } from "react";
import Header from "../../../components/Header";

const StockOpname = () => {
  const { stockList, getProductList, resetProductStock, postProductStock } =
    store((state) => state);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const colVisibility = {
  //   id: false,
  //   name: true,
  //   category: true,
  //   brand: true,
  //   currentStock: true,
  // };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    //Here manipulate the rows depending on what you want to do
    console.log("oldRow ==>", oldRow);
    console.log("newRow ==>", newRow);
    resetProductStock(newRow);
    return newRow;
  };

  const handleUpdateStock = (e) => {
    if (e) {
      e.preventDefault();
    }
    postProductStock();
  };

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
      field: "currentStock",
      headerName: "Current Stock",
      headerAlign: "left",
      align: "left",
      flex: 1,
      cellClassName: "current-stock-column--cell",
      type: "number",
      editable: true,
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
      <Button type="submit" onClick={(e) => handleUpdateStock(e)} color="secondary" variant="contained">
        Update Stock
      </Button>
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
        <DataGrid
          rows={stockList}
          columns={columns}
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={(error) => console.log(error)}
        />
      </Box>
    </Box>
  );
};

export default StockOpname;
