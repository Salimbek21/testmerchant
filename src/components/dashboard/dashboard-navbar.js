import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { Menu as MenuIcon } from "../../icons/menu";
import { Bell as BellIcon } from "../../icons/bell";
import { Search as SearchIcon } from "../../icons/search";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { ContactsPopover } from "./contacts-popover";
import { NotificationsPopover } from "./notifications-popover";
import { LanguagePopover } from "./language-popover";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../hooks/use-auth";

const languages = {
  en: "/static/icons/uk_flag.svg",
  de: "/static/icons/de_flag.svg",
  es: "/static/icons/es_flag.svg",
};

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === "light"
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        boxShadow: "none",
      }),
}));

const LanguageButton = () => {
  const anchorRef = useRef(null);
  const { i18n } = useTranslation();
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenPopover} ref={anchorRef} sx={{ ml: 1 }}>
        <Box
          sx={{
            display: "flex",
            height: 20,
            width: 20,
            "& img": {
              width: "100%",
            },
          }}
        >
          <img alt="" src={languages[i18n.language]} />
        </Box>
      </IconButton>
      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

const ContentSearchButton = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenSearchDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton onClick={handleOpenSearchDialog} sx={{ ml: 1 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {/* <ContentSearchDialog
        onClose={handleCloseSearchDialog}
        open={openDialog}
      /> */}
    </>
  );
};

const ContactsButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      {/* <Tooltip title="Contacts">
        <IconButton
          onClick={handleOpenPopover}
          sx={{ ml: 1 }}
          ref={anchorRef}
        >
          <UsersIcon fontSize="small" />
        </IconButton>
      </Tooltip> */}
      {/* <ContactsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      /> */}
    </>
  );
};

const NotificationsButton = () => {
  const anchorRef = useRef(null);
  const [unread, setUnread] = useState(0);
  const [openPopover, setOpenPopover] = useState(false);
  // Unread notifications should come from a context and be shared with both this component and
  // notifications popover. To simplify the demo, we get it from the popover

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  const handleUpdateUnread = (value) => {
    setUnread(value);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleOpenPopover}>
          <Badge color="error" badgeContent={unread}>
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        onUpdateUnread={handleUpdateUnread}
        open={openPopover}
      />
    </>
  );
};

const AccountButton = () => {
  const anchorRef = useRef(null);
  const [openPopover, setOpenPopover] = useState(false);
  // To get the user from the authContext, you can use
  // `const { user } = useAuth();`
  const user = {
    avatar: "/static/mock-images/avatars/avatar-anika_visser.png",
    name: "Anika Visser",
  };

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          display: "flex",
          ml: 2,
        }}
      >
        <Avatar
          sx={{
            height: 40,
            width: 40,
          }}
          src={user.avatar}
        >
          <UserCircleIcon fontSize="small" />
        </Avatar>
      </Box>
      {/* <AccountPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      /> */}
    </>
  );
};

export const DashboardNavbar = (props) => {
  const { onOpenSidebar, ...other } = props;
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/authentication/login?returnUrl=%2F").catch(console.error);
    } catch (err) {
      toast.error("Unable to logout.");
    }
  };

  const setting = localStorage.getItem("settings");
  const result = JSON.parse(setting);
  console.log(result?.theme == "light" ? "light" : "night", "settin");
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        {(() => {
          switch (router.pathname) {
            case "/dashboard":
              return (
                <Box className="absol">
                  <Typography
                    sx={{
                      color: result?.theme == "light" ? "#000" : "#fff",
                      position: "absolute",
                      left: "60px",
                      top: "20px",
                      zIndex: "2222",
                      fontWeight: "700",
                    }}
                  >
                    Мониторинг
                  </Typography>
                </Box>
              );
            case "/dashboard/products":
              return (
                <Box
                  sx={{
                    color: result?.theme == "light" ? "#000" : "#fff",
                    position: "absolute",
                    left: "60px",
                    top: "20px",
                    zIndex: "2222",
                    fontWeight: "700",
                  }}
                >
                  Список Продуктов
                </Box>
              );
            case "/dashboard/product/[id]":
              return (
                <Box
                  sx={{
                    color: result?.theme == "light" ? "#000" : "#fff",
                    position: "absolute",
                    left: "60px",
                    top: "20px",
                    zIndex: "2222",
                    fontWeight: "700",
                  }}
                >
                  Просмотр продукта
                </Box>
              );
            case "/dashboard/orders":
              return (
                <Box
                  sx={{
                    color: result?.theme == "light" ? "#000" : "#fff",
                    position: "absolute",
                    left: "60px",
                    top: "20px",
                    zIndex: "2222",
                    fontWeight: "700",
                  }}
                >
                  Заказы
                </Box>
              );
            case "/dashboard/magazine":
              return (
                <Box
                  sx={{
                    color: result?.theme == "light" ? "#000" : "#fff",
                    position: "absolute",
                    left: "60px",
                    top: "20px",
                    zIndex: "2222",
                    fontWeight: "700",
                  }}
                >
                  Магазины
                </Box>
              );
              case "/dashboard/topSales":
              return (
                <Box
                  sx={{
                    color: result?.theme == "light" ? "#000" : "#fff",
                    position: "absolute",
                    left: "60px",
                    top: "20px",
                    zIndex: "2222",
                    fontWeight: "700",
                  }}
                >
                  Топ продаж
                </Box>
              );
            case "/dashboard/product":
              return (
                <Box
                  sx={{
                    color: result?.theme == "light" ? "#000" : "#fff",
                    position: "absolute",
                    left: "60px",
                    top: "20px",
                    zIndex: "2222",
                    fontWeight: "700",
                  }}
                >
                  Товары
                </Box>
              );
            case "/dashboard/update":
              return (
                <Box
                  sx={{
                    color: result?.theme == "light" ? "#000" : "#fff",
                    position: "absolute",
                    left: "60px",
                    top: "20px",
                    zIndex: "2222",
                    fontWeight: "700",
                  }}
                >
                  Обновить информацию
                </Box>
              );
            case "/dashboard/info":
              return (
                <Box
                  sx={{
                    color: result?.theme == "light" ? "#000" : "#fff",
                    position: "absolute",
                    left: "60px",
                    top: "20px",
                    zIndex: "2222",
                    fontWeight: "700",
                  }}
                >
                  Информация
                </Box>
              );
          }
        })()}

        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <ListItemIcon
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            <LogoutIcon fontSize="small" />
            <span
              style={{
                fontWeight: "700",
              }}
            >
              Выйти
            </span>
          </ListItemIcon>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
