import { TableContainer } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";

export const StyledTableContainer = muiStyled(TableContainer)({
  backgroundColor: "transparent",
  '& .MuiTable-root': {
    backgroundColor: "transparent",
    borderCollapse: "separate",
    borderSpacing: "0 0px",
  },
  '& .MuiTableHead-root': {
    background: "linear-gradient(90deg, rgba(26, 179, 229, 0.5) 0%, rgba(3, 79, 137, 0.5) 100%)",
    border: "1px solid #1AB3E5",
    height: "60px",
  },
  '& .MuiTableHead-root .MuiTableRow-root': {
    backgroundColor: "transparent",
    '& .MuiTableCell-root': {
      color: "#fff",
      fontSize:"17px",
      fontWeight:"700",
    },
  },
  '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd)': {
    backgroundColor: "#101012",
  },
  '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even)': {
    backgroundColor: "#000000",
  },
  '& .MuiTableBody-root .MuiTableRow-root:hover': {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  '& .MuiTableCell-root': {
    borderBottom: "none",
    color: "#fff",
    padding: "16px 8px",
    fontSize:"16px",
    fontWeight:"400",
    '&:first-of-type': {
      paddingLeft: "24px",
      borderTopLeftRadius: "8px",
      borderBottomLeftRadius: "8px",
    },
    '&:last-of-type': {
      paddingRight: "24px",
      borderTopRightRadius: "8px",
      borderBottomRightRadius: "8px",
    },
  },
});
