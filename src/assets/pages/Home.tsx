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
import CardStorage from "../data/cardData.json";
import "../styles/global.css";
// interfaces
interface LocationState {
  email: string;
  name: string;
}

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
    Object.defineProperty(card, "icon", {
      value: IconArr[index],
    });
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
        }}
      >
        {/* nav bar */}
        <header>
          <NavBar email={email} name={name} windowWidth={windowWidth} />
        </header>

        {/* main content */}
        {/* 1. Graphs and stats */}
        {/* App status component */}
      </Box>
    </>
  );
};

interface NavProps {
  email: string;
  name: string;
  windowWidth: number;
}

const NavBar = ({ email, name, windowWidth }: NavProps) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const handleToggleSidebar = () => {
    setSideBarOpen((prev) => !prev);
  };
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
            animate={{ opacity: [0, 1], x: [20, 0] }}
            transition={{ duration: "0.7", ease: "easeInOut" }}
            sx={{ color: "text.disabled" }}
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
