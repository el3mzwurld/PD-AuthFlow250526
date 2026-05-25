import { Box, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { AiFillDatabase } from "react-icons/ai";
interface StatusCardProps {
  title: string;
  uptime: number;
  responseTime: number;
  status: {
    error?: boolean;
    clean?: boolean;
    warning?: boolean;
  };
}
const StatusCard = ({
  title,
  uptime,
  responseTime,
  status,
}: StatusCardProps) => {
  const now = new Date();
  const date = now.toLocaleString();
  const theme = useTheme();
  return (
    <Box
      component={motion.div}
      animate={{ opacity: [0, 0.8, 1] }}
      transition={{ duration: 0.5, ease: "ease-out" }}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        px: 2.5,
        py: 2.5,
        height: "60px",
        alignItems: "center",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1.5,
      }}
    >
      <Stack
        className="app-details"
        direction={"row"}
        sx={{ alignItems: "center", width: "35%" }}
        spacing={2}
      >
        {/* icon */}
        <Box
          sx={{
            backgroundColor: "#DDEEFF",
            height: "30px",
            width: "30px",
            borderRadius: 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AiFillDatabase size={15} color="black" />
        </Box>
        {/* details */}
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: 13, display: "flex", gap: 2 }}
          >
            {title}
            {status.clean && (
              <Box
                sx={{
                  fontWeight: theme.typography.fontWeightMedium,
                  fontSize: "10px",
                  backgroundColor: "#72a28449",
                  px: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  Operational
                </Typography>
              </Box>
            )}
            {status.error && (
              <Box
                sx={{
                  fontWeight: theme.typography.fontWeightMedium,
                  fontSize: "10px",
                  backgroundColor: "#ef444436",
                  px: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  Down
                </Typography>
              </Box>
            )}
            {status.warning && (
              <Box
                sx={{
                  fontSize: "10px",
                  backgroundColor: "#fbbe2436",
                  px: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  Warning
                </Typography>
              </Box>
            )}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.disabled }}
          >
            Last Checked at : {date}
          </Typography>
        </span>
      </Stack>
      <Stack
        direction={"row"}
        className="app-stats"
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
        spacing={1.5}
      >
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ color: theme.palette.text.disabled, fontSize: "10px" }}
          >
            Uptime
          </span>
          <Typography
            variant="caption"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            {uptime}%
          </Typography>
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ color: theme.palette.text.disabled, fontSize: "10px" }}
          >
            Response
          </span>
          <Typography
            variant="caption"
            sx={{ fontWeight: theme.typography.fontWeightBold }}
          >
            {responseTime}ms
          </Typography>
        </span>
      </Stack>
    </Box>
  );
};

export default StatusCard;
