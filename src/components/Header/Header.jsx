import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  console.log(quantity);
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
  const menuRef = useRef();
  return (
    // <div className="containter">
    //   <div className="header">
    //     <div
    //       className="logo"
    //       onClick={() =>
    //         login?.currentUser?.data?.userDTO?.role != "admin"
    //           ? navigate("/")
    //           : navigate("/manage/product")
    //       }
    //     >
    //       <GrassIcon></GrassIcon>
    //       <p>Planty</p>
    //     </div>
    //     {login?.currentUser?.data?.userDTO?.role == "admin" ? (
    //       <div className="header-mid">
    //         <NavLink to="/manage/product">Quản lý sản phẩm</NavLink>
    //         <NavLink to="/manage/order">Quản lý đơn hàng</NavLink>
    //         <NavLink to="/manage/statistic">Thống kê</NavLink>
    //         <NavLink to={"/manage/user"}>Quản lý khách hàng</NavLink>
    //         <NavLink to={"/manage/discount"}>Quản lý khuyến mãi</NavLink>
    //       </div>
    //     ) : (
    //       <></>
    //     )}

    //     {login.currentUser?.data?.userDTO != undefined ? (
    //       <div
    //         className="left_header_container"
    //         style={
    //           login?.currentUser?.data?.userDTO?.role == "admin"
    //             ? {
    //                 justifyContent: "flex-end",
    //               }
    //             : {
    //                 justifyContent: "space-between",
    //               }
    //         }
    //       >
    //         {login?.currentUser?.data?.userDTO?.role == "user" ? (
    //           <div
    //             className="cart_container"
    //             onClick={() =>
    //               navigate(`/cart/${login?.currentUser?.data?.userDTO?.id}`)
    //             }
    //           >
    //             <ShoppingCartOutlinedIcon />
    //             <p>{quantity && quantity}</p>
    //           </div>
    //         ) : (
    //           <></>
    //         )}

    //         <div
    //           className="account_container"
    //           onClick={handleActiveOption}
    //           ref={navRef}
    //         >
    //           <PersonOutlineOutlinedIcon />
    //           <div
    //             className="account_option"
    //             tabIndex={0}
    //             onBlur={() => setActiveOption(false)}
    //             style={activeOption ? { display: "flex" } : { display: "none" }}
    //           >
    //             <p >
    //               Hello, <span>{login?.currentUser?.data?.userDTO?.name}</span>
    //             </p>
    //             <NavLink to="/update/password">Đổi mật khẩu</NavLink>
    //             <NavLink to="/update/infor">Thay đổi thông tin</NavLink>
    //             {login?.currentUser?.data?.userDTO?.role == "user" ? (
    //               <NavLink to={`/order/user`}>Đơn mua</NavLink>
    //             ) : (
    //               <></>
    //             )}

    //             <NavLink onClick={handleLogout}>
    //               <div className="account_option-logout">
    //                 <ExitToAppIcon />
    //                 <p>Đăng xuất</p>
    //               </div>
    //             </NavLink>
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="auth_option">
    //         <NavLink to="/login">Đăng nhập</NavLink>
    //         <NavLink
    //           to="/signup"
    //           style={{ color: "white", background: "#1eb853" }}
    //         >
    //           Đăng ký
    //         </NavLink>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <header className="w-full max-w-screen-xl p-6 mx-auto ">
      <nav className="relative flex flex-row items-center justify-between">
        <div
          className="z-10 flex text-xl font-semibold text-center cursor-pointer logo basis-1/6"
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
            <ul
              ref={menuRef}
              id="header-menu"
              className="z-50 hidden text-sm font-medium tracking-widest text-gray-500 basis-3/6 lg:flex lg:items-center lg:justify-end lg:gap-8"
            >
              <li className="ndv-top-menu-item">
                <NavLink to="/manage/product">Quản lý sản phẩm</NavLink>
              </li>
              <li className="ndv-top-menu-item">
                <NavLink to="/manage/order">Quản lý đơn hàng</NavLink>
              </li>
              <li className="ndv-top-menu-item">
                <NavLink to="/manage/statistic">Thống kê</NavLink>
              </li>
              <li className="ndv-top-menu-item ">
                <NavLink to={"/manage/user"}>Quản lý khách hàng</NavLink>
              </li>
              <li className="ndv-top-menu-item ">
                <NavLink to={"/manage/discount"}>Quản lý khuyến mãi</NavLink>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <ul
              ref={menuRef}
              id="header-menu"
              className="z-50 hidden text-sm font-medium tracking-widest text-gray-500 basis-3/6 lg:flex lg:items-center lg:justify-end lg:gap-8"
            >
              <li className="ndv-top-menu-item">
                <NavLink to="/">HOME</NavLink>
              </li>
              <li className="ndv-top-menu-item">
                <NavLink to="/products">PRODUCTS</NavLink>
              </li>
              <li className="ndv-top-menu-item">
                <NavLink to="/contact">CONTACT</NavLink>
              </li>
              <li className="ndv-top-menu-item lg:hidden">
                <NavLink to="/profile">PROFILE</NavLink>
              </li>
            </ul>
          </>
        )}

        {login?.currentUser?.data?.userDTO !== undefined ? (
          <div
            className="left_header_container"
            style={
              login?.currentUser?.data?.userDTO?.role === "admin"
                ? { justifyContent: "flex-end" }
                : { justifyContent: "space-between" }
            }
          >
            <div className="flex">
              {login?.currentUser?.data?.userDTO?.role === "user" && (
                <div
                  className="cart_container"
                  onClick={() =>
                    navigate(`/cart/${login?.currentUser?.data?.userDTO?.id}`)
                  }
                >
                  <div className="z-10 flex items-center justify-end ml-16 text-sm font-medium text-gray-500 uppercase shopping basis-3/6 lg:basis-1/6 lg:justify-start">
                    <div className="flex items-center cart ndv-top-menu-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="ndv-icon"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>

                      <span className="mx-2">cart</span>
                      <span className="text-white bg-gray-500 ndv-badge-circle ">
                        {quantity && quantity}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="relative flex items-center justify-end cursor-pointer gap-x-3 basis-1/6 lg:ml-4">
                <div className="sm:hidden">
                  <div
                    className="account_container"
                    onClick={handleActiveOption}
                    ref={navRef}
                  >
                    <PersonOutlineOutlinedIcon />
                    <div
                      className="account_option absolute w-[200px] p-2 border border-black right-0 z-10 bg-white"
                      tabIndex={0}
                      onBlur={() => setActiveOption(false)}
                      style={
                        activeOption
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <p>
                        Hello,{" "}
                        <span>{login?.currentUser?.data?.userDTO?.name}</span>
                      </p>
                      <NavLink to="/update/password" className="block">
                        Đổi mật khẩu
                      </NavLink>
                      <NavLink to="/update/infor" className="block">
                        Thay đổi thông tin
                      </NavLink>
                      {login?.currentUser?.data?.userDTO?.role == "user" ? (
                        <NavLink to={`/order/user`} className="block">
                          Đơn mua
                        </NavLink>
                      ) : (
                        <></>
                      )}

                      <NavLink onClick={handleLogout} className="block">
                        <div className="flex account_option-logout">
                          <ExitToAppIcon />
                          <p>Đăng xuất</p>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
                {/* {!close && (
                        <div className='lg:hidden' onClick={() => handleHide()}>
                            <svg id="toggle-header-menu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ndv-icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    )}
                    {
                        close && (
                            <div className='w-4 mt-1 text-lg lg:hidden' onClick={() => handleClose()}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                        )
                    } */}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex auth_option gap-x-3">
            <NavLink
              to="/login"
              className="bg-[#1eb853] p-2 rounded-lg text-white"
            >
              Đăng nhập
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-[#1eb853] p-2 rounded-lg"
              style={{ color: "white", background: "#1eb853" }}
            >
              Đăng ký
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
