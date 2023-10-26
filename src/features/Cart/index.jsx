import React, { useEffect, useState } from "react";
import "./style.scss";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../../store/action/cart";
import CartTable from "./Table";
const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { cartDTO } = useSelector((state) => state.cart.data);

  const [cartDTO, setCartDTO] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const limit = 4;
  const [childChange, setChildChange] = useState(false);

  const handleChildAction = () => {
    setChildChange(true);
  };
  const handlePageChange = (page) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    dispatch(getCartThunk([currentPage - 1, limit])).then((res) => {
      console.log(res);
      setCartDTO(res?.payload?.cartDTO);
      setTotalPages(res?.payload?.totalPages);
      setTotalItem(res?.payload?.totalItem);
      // setCartDTO(res?.payload?.cartDTO);
      setSubTotal(res?.payload?.cartDTO?.subTotal);
      setChildChange(false);
    });
  }, [currentPage, childChange]);
  return (
    <div className="container">
      <div className="cart_container">
        <h1 className="cart_title">Giỏ hàng</h1>
        <h4 className="cart_totalItem">
          <p>
            Hiện đang có{" "}
            <span>{totalItem && totalItem} sản phẩm trong giỏ hàng</span>
          </p>
        </h4>
        {cartDTO != undefined ? (
          <div>
            <CartTable
              className="cart_list"
              list={cartDTO?.list}
              no={currentPage - 1}
              limit={limit}
              onPageChange={handlePageChange}
              totalPages={totalPages}
              onChildAction={handleChildAction}
            ></CartTable>
            <div className="cart-subTotal">
              <p>
                Tạm tính:{" "}
                <span>{subTotal && subTotal.toLocaleString()} VND</span>
              </p>
            </div>
            {cartDTO?.list?.length > 0 ? (
              <div className="cart_btn-cover">
                <button onClick={() => navigate("/order")} className="cart_btn">
                  Tiến hành đặt hàng
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CartPage;
