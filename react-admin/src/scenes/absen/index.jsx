import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { store } from "../../store";
import Header from "../../components/Header";

const LogAbsen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { absen } = store((state) => state);
  const columns = [
    {
      field: "activity",
      headerName: "Activity",
      flex: 1,
      cellClassName: "activity-column--cell",
    },
    {
      field: "createdAt",
      headerName: "Time",
      flex: 1,
      cellClassName: "createdAt-column--cell",
    },
  ];

  return (
    <Box>
      <Header title="LOG ACTIVITY" />
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
          rows={absen}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default LogAbsen;
