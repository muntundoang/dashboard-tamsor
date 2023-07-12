import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./scenes/main";
import Dashboard from "./scenes/dashboard";
import Bar from "./scenes/bar";
import Register from "./scenes/form/create-user";
import SigninPage from "./scenes/login/SigninPage";
import Inventory from "./scenes/inventory/index.js";
import LogAbsen from "./scenes/absen";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="" element={<Main />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/logAbsen" element={<LogAbsen />} />
            {/* <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/line" element={<Line />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/geography" element={<Geography />} /> */}
            <Route path="/calendar" element={<Calendar />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="login" element={<SigninPage />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
