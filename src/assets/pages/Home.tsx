import { Box, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
// images and icons
import logo from "../images/logo.svg";
import { MdOutlineEdit } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import { MdOutlineSend } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { AiFillDatabase } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";
import { CiWarning } from "react-icons/ci";
//data imports
import { CardStorage } from "../data/cardData.ts";
import "../styles/global.css";
// components
import StatCard from "../components/StatCard";
import { AppTrafficGraph, TransferTrackGraph } from "../components/Graphs";
import StatusCard from "../components/StatusCard";
// interfaces
interface LocationState {
  email: string;
  name: string;
}

interface AppStatus {
  title: string;
  uptime: number;
  responseTime: number;
  status: {
    error?: boolean;
    clean?: boolean;
    warning?: boolean;
  };
}

const AppStatusStats: AppStatus[] = [
  {
    title: "Database Service",
    uptime: 99,
    responseTime: 30,
    status: {
      error: true,
    },
  },
  {
    title: "API Gateway",
    uptime: 99.5,
    responseTime: 45,
    status: {
      clean: true,
    },
  },
  {
    title: "Cache Service",
    uptime: 98.9,
    responseTime: 15,
    status: {
      warning: true,
    },
  },
  {
    title: "Auth Service",
    uptime: 99.9,
    responseTime: 60,
    status: {
      clean: true,
    },
  },
];

const Home = () => {
  // States
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const theme = useTheme();

  const IconArr = [
    AiFillDatabase,
    CiClock2,
    MdOutlineSend,
    CiWarning,
  ] as (typeof MdOutlineEdit)[];

  const CardArray = [] as typeof CardStorage;

  CardStorage.forEach((object) => CardArray.push(object));

  CardArray.forEach((card, index) => {
    card.icon = IconArr[index];
  });

  const Location = useLocation();
  const { email, name } = Location.state as LocationState;

  useEffect(() => {
    const handleScreenSize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleScreenSize);

    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundColor: "background.authSide",
          overflowX: "hidden",
        }}
      >
        {/* nav bar */}
        <header style={{ position: "sticky" }}>
          <NavBar email={email} name={name} windowWidth={windowWidth} />
        </header>

        {/* main content */}
        <Box
          component={motion.main}
          animate={{ opacity: [0, 0, 1], y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          sx={{
            height: "auto",
            width: "100%",
            p: 2.5,
            px: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            overflow: "hidden",
            overflowY: "auto",
            backgroundColor: "background.authSide",
            fontFamily: theme.typography.altFont,
          }}
        >
          {/* 1. Graphs and stats */}
          <Stack
            direction={"row"}
            component={motion.section}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.25 }}
            sx={{
              width: "100%",
              height: "auto",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
            }}
            spacing={{ xs: 2, lg: 5 }}
          >
            {CardArray.map((card, index) => (
              <StatCard
                key={index}
                title={card.title}
                icon={card.icon}
                stat={card.stat}
                negative={card.negative}
                caption={card.caption}
              />
            ))}
          </Stack>

          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              height: "350px",
              alignItems: "center",
              justifyContent: "space-between",
              py: 1.5,
              px: 2.5,
            }}
          >
            <Stack
              sx={{
                alignItems: "start",
                color: "text.primary",
                height: "100%",
                width: "49%",
                border: "1px solid",
                borderColor: "divider",
                py: 1.2,
                pt: 2,
                px: 1.7,
                backgroundColor: "background.default",
                borderRadius: 2.5,
                justifyContent: "space-between",
                gap: 2.5,
              }}
            >
              <Typography variant="h4">Application Traffic (24h)</Typography>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  width: "100%",
                  height: "75%",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <AppTrafficGraph />
              </Box>
            </Stack>
            <Stack
              sx={{
                alignItems: "start",
                color: "text.primary",
                height: "100%",
                width: "49%",
                border: "1px solid",
                borderColor: "divider",
                py: 1.2,
                pt: 2,
                px: 1.7,
                backgroundColor: "background.default",
                borderRadius: 2.5,
              }}
            >
              <Typography variant="h4">Transaction Status (24h)</Typography>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  width: "100%",
                  height: "75%",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <TransferTrackGraph />
              </Box>
            </Stack>
          </Stack>

          {/* App status component */}
          <section style={{ width: "100%", padding: 16 }}>
            <Stack
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: [9, 0] }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "400px",
                overflowY: "auto",
                py: 2.5,
                backgroundColor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                px: 1.8,
                borderRadius: 2.5,
                alignItems: "start",
              }}
              spacing={2}
            >
              <Typography variant="h4">Application Services Status</Typography>
              {AppStatusStats.map((statusCard, index) => (
                <StatusCard
                  title={statusCard.title}
                  uptime={statusCard.uptime}
                  responseTime={statusCard.responseTime}
                  status={statusCard.status}
                  key={index}
                />
              ))}
            </Stack>
          </section>
        </Box>
      </Box>
    </>
  );
};

interface NavProps {
  email: string;
  name: string;
  windowWidth: number;
}

const NavBar = ({ name, windowWidth }: NavProps) => {
  // for later
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const handleToggleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };
  const theme = useTheme();
  return (
    <>
      <Box
        component={"nav"}
        sx={{
          display: "flex",
          height: { xs: "35px", lg: "55px" },
          backgroundColor: "background.default",
          paddingY: { xs: "0.25rem", lg: "0.7rem" },
          paddingX: { xs: "0.5rem", lg: 4 },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          position: "relative",
        }}
      >
        {/* logo */}
        <Stack
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          direction="row"
          sx={{
            height: "100%",
            width: { xs: "40%", md: "25%" },
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          className="logo"
          spacing={2}
        >
          <img src={logo} style={{ width: "40px", height: "auto" }} alt="" />
          <span
            style={{
              display: "flex",
              justifyItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">SleekNote Pro</Typography>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              Dashboard
            </Typography>
          </span>
        </Stack>

        {/* controls */}
        {windowWidth < 768 ? (
          <MobControls
            open={sideBarOpen}
            setIsOpen={setSideBarOpen}
            toggleOpen={handleToggleSidebar}
          />
        ) : (
          <Controls />
        )}
        {/* condition ? check if windowWidth is below desktop reqs, if yes..display hamburger menu */}

        {/* Welcome message */}
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "center", gap: 0.75 }}
        >
          <Typography variant="h3">Welcome,</Typography>
          <Typography
            component={motion.p}
            variant="h3"
            style={{ color: theme.palette.text.disabled }}
            animate={{ opacity: [0, 1], x: [20, 0] }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {name}
          </Typography>
        </Stack>

        {windowWidth < 1024 ? <></> : <></>}
      </Box>
    </>
  );
};

const Controls = () => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      sx={{
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 0.75,
        flex: 1,
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <motion.ul
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: 2,
          width: "100%",
          height: "100%",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            cursor: "pointer",
          }}
        >
          {/* Icon */}
          <MdOutlineEdit color={theme.palette.primary.dark} size={18} />
          {/* Caption */}
          <Typography variant="body2">Wireframe</Typography>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            cursor: "pointer",
          }}
        >
          {/* Icon */}
          <MdNotificationsNone color={theme.palette.primary.dark} size={18} />
          {/* Caption */}
          <Typography variant="body2">Actions</Typography>
        </Stack>{" "}
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            cursor: "pointer",
          }}
        >
          {/* Icon */}
          <MdOutlineSend color={theme.palette.primary.dark} size={18} />
          {/* Caption */}
          <Typography variant="body2">Transactions</Typography>
        </Stack>{" "}
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            gap: 0.75,
            cursor: "pointer",
          }}
        >
          {/* Icon */}
          <HiOutlineUser color={theme.palette.primary.dark} size={18} />
          {/* Caption */}
          <Typography variant="body2">User Flow</Typography>
        </Stack>
      </motion.ul>
    </Stack>
  );
};

interface SideBarProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: () => void;
}
const MobControls = ({ open }: SideBarProps) => {
  return (
    <Box sx={{ position: "absolute", display: open ? "flex" : "none" }}></Box>
  );
};
export default Home;
