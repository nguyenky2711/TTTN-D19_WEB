import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersThunk } from "../../../store/action/order";
import OrderManagerTable from "./Table";
const ManageOrder = () => {
  const dispatch = useDispatch();
  // const { data } = useSelector((state) => state?.order?.list);
  const [data, setData] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 4;
  const [childChange, setChildChange] = useState(false);
  const handleChildAction = () => {
    setChildChange(true);
  };
  useEffect(() => {
    dispatch(getOrdersThunk([currentPage - 1, limit])).then((res) => {
      setData(res?.payload?.data);
      setChildChange(false);
      setTotalPages(res?.payload?.totalPages);
    });
  }, [currentPage, childChange]);
  const handlePageChange = (page) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="container">
      <div className="orderHistory_container">
        <h1 className="orderHistory_title">Đơn hàng</h1>
        {data != undefined ? (
          <OrderManagerTable
            list={data}
            no={currentPage - 1}
            limit={limit}
            onPageChange={handlePageChange}
            onChildAction={handleChildAction}
            totalPages={totalPages}
          ></OrderManagerTable>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ManageOrder;
