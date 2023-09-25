import React, { useEffect, useState } from "react";
import "./style.scss";
import Table from "../../components/Table";
import OrderHistoryTable from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserThunk, getOrdersThunk } from "../../store/action/order";
const OrderHistory = () => {
  const dispatch = useDispatch();
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const [data, setData] = useState();
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
    dispatch(getOrdersThunk([currentPage - 1, limit])).then((res) => {
      setData(res?.payload);
      setTotalPages(res?.payload?.totalPages);
      setChildChange(false);
    });
  }, [currentPage, childChange]);
  return (
    <div className="container">
      <div className="orderHistory_container">
        <h1 className="orderHistory_title">Đơn hàng</h1>
        {data != undefined ? (
          <OrderHistoryTable
            list={data.list}
            no={currentPage - 1}
            limit={limit}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            onChildAction={handleChildAction}
          ></OrderHistoryTable>
        ) : (
          <></>
        )}
        {/* <Table
          list={data}
          className="orderHistory_list"
          type={"orderHistory"}
        /> */}
      </div>
    </div>
  );
};

export default OrderHistory;
