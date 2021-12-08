import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
    typography:{
        fontFamily: "Open Sans, sans-serif",
        fontSize: 14,
        button: {
            textTransform: "none",
            letterSpacing: 0,
            fontWeight: "bold"
        }
    },
    palette: {
        primary: { main: "#3A8DFF" },
        secondary: { main: "#B0B0B0"}
    },
    spacing: 4
});