import { Outlet } from "react-router-dom";
import Topbar from "../global/Topbar";
import Sidebarmenu from "../global/Side-bar";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import { store } from "../../store";

const Main = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const { setToken, fetchUser, user, loading } = store((state) => state);
  let style

  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    } else {
      const fetch = async () => {
        try {
          await setToken(access_token);
          await fetchUser();
          if (!user.valid) {
            navigate("/login");
          }
        } catch (error) {
          console.log("error di fetch main ==>", error);
        }
      };
      fetch();
      return () => {};
    }
  }, []);

  if(loading){
    style = {
      opacity: "30%", 
      pointerEvents: "none"
    }
  } else {
    style = {
      opacity: "100%"
    }
  }

  return (
    <>
      {loading ? (
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
          marginTop: "40vh"
        }}
      >
        <CircularProgress color="secondary" size={"150px"}/>
      </Box>
      ) : (
        <></>
      )}
      <div className="app" style={style}>
        <Sidebarmenu />
        <main className="content">
          <Topbar />
          <div className="routes">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
