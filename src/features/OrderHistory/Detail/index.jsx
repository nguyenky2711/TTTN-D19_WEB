import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiscountByIDThunk,
  getOrderDetailThunk,
  getPaymentByIDThunk,
} from "../../../store/action/order";
import UserOrderDetailTable from "./Table";
import moment from "moment";
const UserOrderDetail = () => {
  const dispatch = useDispatch();
  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);

  // const { data } = useSelector((state) => state.order.list);
  const [data, setData] = useState();
  const [discountData, setDiscountData] = useState();
  const [paymentData, setPaymentData] = useState();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
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
    dispatch(getOrderDetailThunk([id, currentPage - 1, 4])).then((res) => {
      setData(res?.payload?.data);
      setTotalPages(res?.payload?.totalPages);
      setChildChange(false);
    });
    // dispatch(getPaymentByIDThunk());
  }, [currentPage]);
  useEffect(() => {
    if (data != undefined) {
      dispatch(getPaymentByIDThunk(data.orderDTO.payment_id)).then((res) => {
        setPaymentData(res?.payload);
      });
      dispatch(getDiscountByIDThunk(data.orderDTO.discount_id)).then((res) => {
        setDiscountData(res?.payload);
      });
    }
  }, [data]);
  return (
    <div className="container">
      <div className="orderHistory_container">
        <h1 className="orderHistory_title">Chi tiết đơn hàng</h1>
        <div className="orderHistory_content">
          <p>
            Ngày đặt:{" "}
            <span>
              {data && moment(data.orderDTO.created_at).format("DD-MM-YYYY")}
            </span>
          </p>
          <p>
            Thực tổng: $
            <span>
              {data &&
                discountData &&
                data?.orderDTO?.total + discountData?.data?.maxGet}
            </span>
          </p>
          <p>
            Giảm giá: $<span>{discountData && discountData?.data?.maxGet}</span>
          </p>
          <p>
            Thực trả: $<span>{data && data?.orderDTO?.total}</span>
          </p>
          <p>
            Phương thức thanh toán:{" "}
            <span>{paymentData && paymentData?.data?.method}</span>
          </p>
          <p>
            Thông tin người nhận:{" "}
            <span>{data && data?.orderDTO?.receiver_name}</span>
            {" - "}
            <span>{data && data?.orderDTO?.receiver_phone}</span>
            {" - "}
            <span>{data && data?.orderDTO?.receiver_address}</span>
          </p>
        </div>
        {data != undefined ? (
          <UserOrderDetailTable
            list={data?.order_detailDTO}
            no={currentPage - 1}
            limit={limit}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            onChildAction={handleChildAction}
          ></UserOrderDetailTable>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserOrderDetail;
