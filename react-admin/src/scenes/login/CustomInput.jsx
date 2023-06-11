import { VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Typography,
  useTheme
} from "@mui/material";
import { tokens } from "../../theme";

const CustomInput = ({ isIconActive, label, placeholder, typeInput, setValue }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="flex-start"
      mb={2}
    >
      <Box display="flex" flexDirection="column" justifyContent="flex-start">
        <Typography pb={1}>
          {label}
        </Typography>

        <Paper
          sx={{
            background: colors.primary[400],
            width: "100%",
          }}
        >
          <InputBase
            placeholder={placeholder}
            fullWidth
            sx={{
              bgcolor: colors.primary[400],
              p: 1,
              borderRadius: "5px",
            }}
            endAdornment={
              isIconActive && (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <IconButton edge="end">
                    <VisibilityOff />
                  </IconButton>
                </InputAdornment>
              )
            }
            type={typeInput}
            onChange={(e) => setValue(e)}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default CustomInput;
