import { motion } from "motion/react";
import { IconType } from "react-icons";
import { Box, Stack, Typography } from "@mui/material";
// images and icons
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
// Card props
interface CardProps {
  title: string;
  icon: IconType;
  stat: string;
  caption: string;
  positive?: boolean;
  negative?: boolean;
}

const StatCard = (props: CardProps) => {
  const Icon = props.icon;
  return (
    <Stack
      direction={"row"}
      sx={{
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        px: 1.5,
        height: { xs: "100px", lg: "130px" },
        width: { xs: "auto", lg: "325px", xl: "355px" },
        borderRadius: 2,
      }}
    >
      <Stack
        sx={{
          width: { xs: "60%", lg: "70%" },
          height: "100%",
          justifyContent: "space-evenly",
          py: 2.5,
          px: 1.25,
          alignItems: "start",
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontSize: { xl: "14px" } }}
        >
          {props.title}
        </Typography>
        <Typography variant="h3">{props.stat}</Typography>
        <Typography
          variant="caption"
          sx={{
            color: props.negative ? "error.main" : "success.main",
            fontSize: { xs: 10, xl: 14 },
            display: "flex",
            gap: 0.5,
            alignItems: "center",
          }}
        >
          {props.negative ? (
            <FaArrowDown size={8} color="red" opacity={0.8} />
          ) : (
            <FaArrowUp size={8} color="green" opacity={0.8} />
          )}
          {props.caption}
        </Typography>
      </Stack>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "25px", lg: "40px" },
            height: { xs: "25px", lg: "36px" },
            background: "#DAE9FE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <Icon size={20} color="#234E7B" />
        </Box>
      </Box>
    </Stack>
  );
};

export default StatCard;
