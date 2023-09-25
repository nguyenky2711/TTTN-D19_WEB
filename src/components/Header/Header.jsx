import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { clearAuth } from "../../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GrassIcon from "@mui/icons-material/Grass";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./style.scss";
import { getCartThunk } from "../../store/action/cart";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const handleLogout = () => {
    // sessionStorage.removeItem("userPresent");
    localStorage.removeItem("persist:root");
    dispatch(clearAuth());
    toast.info("Bạn vừa đăng xuất", {
      position: "top-right",
      autoClose: 3000,
      style: { color: "#509AF8", backgroundColor: "#D7F1FD" },
    });
    // navigate("/");
    window.location.href = "/";
  };
  const { login } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCartThunk([0, 100])).then((res) => {});
  }, [dispatch]);
  const quantity = useSelector((state) => state?.cart?.data?.totalItem);

  // useEffect(() => {
  //   setQuantity(state.cart.data.totalItem);
  // }, [dispatch]);
  const [activeOption, setActiveOption] = useState(false);
  const handleActiveOption = () => {
    setActiveOption(!activeOption);
  };
  const handleClickOutsideNav = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setActiveOption(false);
    }
  };
  useEffect(() => {
    // Adding event listener to detect clicks outside the navbar
    document.addEventListener("click", handleClickOutsideNav);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("click", handleClickOutsideNav);
    };
  }, [activeOption]);
  return (
    <div className="containter">
      <div className="header">
        <div
          className="logo"
          onClick={() =>
            login?.currentUser?.data?.userDTO?.role != "admin"
              ? navigate("/")
              : navigate("/manage/product")
          }
        >
          <GrassIcon></GrassIcon>
          <p>Planty</p>
        </div>
        {login?.currentUser?.data?.userDTO?.role == "admin" ? (
          <div className="header-mid">
            <NavLink to="/manage/product">Quản lý sản phẩm</NavLink>
            <NavLink to="/manage/order">Quản lý đơn hàng</NavLink>
            <NavLink to="/manage/statistic">Thống kê</NavLink>
            <NavLink to={"/manage/user"}>Quản lý khách hàng</NavLink>
            <NavLink to={"/manage/discount"}>Quản lý khuyến mãi</NavLink>
          </div>
        ) : (
          <></>
        )}

        {login.currentUser?.data?.userDTO != undefined ? (
          <div
            className="left_header_container"
            style={
              login?.currentUser?.data?.userDTO?.role == "admin"
                ? {
                    justifyContent: "flex-end",
                  }
                : {
                    justifyContent: "space-between",
                  }
            }
          >
            {login?.currentUser?.data?.userDTO?.role == "user" ? (
              <div
                className="cart_container"
                onClick={() =>
                  navigate(`/cart/${login?.currentUser?.data?.userDTO?.id}`)
                }
              >
                <ShoppingCartOutlinedIcon />
                <p>{quantity && quantity}</p>
              </div>
            ) : (
              <></>
            )}

            <div
              className="account_container"
              onClick={handleActiveOption}
              ref={navRef}
            >
              <PersonOutlineOutlinedIcon />
              <div
                className="account_option"
                tabIndex={0}
                onBlur={() => setActiveOption(false)}
                style={activeOption ? { display: "flex" } : { display: "none" }}
              >
                <p>
                  Hello, <span>{login?.currentUser?.data?.userDTO?.name}</span>
                </p>
                <NavLink to="/update/password">Đổi mật khẩu</NavLink>
                <NavLink to="/update/infor">Thay đổi thông tin</NavLink>
                {login?.currentUser?.data?.userDTO?.role == "user" ? (
                  <NavLink to={`/order/user`}>Đơn mua</NavLink>
                ) : (
                  <></>
                )}

                <NavLink onClick={handleLogout}>
                  <div className="account_option-logout">
                    <ExitToAppIcon />
                    <p>Đăng xuất</p>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="auth_option">
            <NavLink to="/login">Đăng nhập</NavLink>
            <NavLink
              to="/signup"
              style={{ color: "white", background: "#1eb853" }}
            >
              Đăng ký
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
