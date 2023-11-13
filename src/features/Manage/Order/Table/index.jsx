import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import NotesIcon from "@mui/icons-material/Notes";
import moment from "moment";
import {
  changeStatusOrderThunk,
  getOrdersThunk,
} from "../../../../store/action/order";
import messages from "../../../../config/messageCode/messages";
const OrderManagerTable = ({
  list,
  listHavePages,
  onPageChange,
  onChildAction,
  no = 0,
  limit = 100,
  reload,
  type,
  arrData = null,
  totalPages = 1,
}) => {
  const boxRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (boxRef.current) {
      const rowHeight = 120; // Chiều cao của mỗi hàng
      const numberOfRows = list.length; // Số lượng hàng
      const rowHeightPlus = 58; // Chiều cao của header

      const newHeight = rowHeight * numberOfRows;
      if (numberOfRows == 0) {
        boxRef.current.style.height = `${100}px`;
      } else {
        boxRef.current.style.height = `${newHeight + rowHeightPlus}px`;
      }
    }
  }, [list]);
  const customLocaleText = {
    noRowsLabel: "Hiện chưa có đơn hàng nào",
    // You can customize other localization strings here as well
  };
  const handleStatusOrder = (orderId, statusId) => {
    const sendData = {
      orderId: orderId,
      statusId: statusId,
    };
    dispatch(changeStatusOrderThunk(sendData)).then((res) => {
      // dispatch(getOrdersThunk([no, limit])).then((res) => {});
      if (res?.payload?.message == messages.STATUS_UPDATED_SUCCESSFULLY) {
        toast.success("Cập nhật đơn hàng thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#DEF2ED" },
        });
        onChildAction();
      }
    });
  };
  const handlePaginationChange = (event, page) => {
    onPageChange(page); // Send the selected page number to the parent
  };
  const comlumnOrder = [
    {
      field: "id",
      headerName: "Mã đơn hàng",
      // width: 70,

      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.15,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="orderHistory_item-id">
            <p>{row.id}</p>
          </div>
        );
      },
    },
    {
      field: "receiver",
      headerName: "Người nhận",
      // width: 70,

      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.25,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="orderHistory_item-receiver">
            <p>Họ và tên: {row.receiver_name}</p>
            <p>SĐT: {row.receiver_phone}</p>
            <p>Địa chỉ nhận: {row.receiver_address}</p>
          </div>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Thời gian đặt đơn",
      // width: 360,
      flex: 0.2,
      height: 70,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="orderHistory_item-time">
            <p>{moment(new Date(row.created_at)).format("DD-MM-YYYY")}</p>
          </div>
        );
      },
    },
    {
      field: "active",
      headerName: "Trạng thái",
      // width: 130,
      align: "center",
      sortable: false,
      headerAlign: "center",
      align: "center",
      height: 70,
      flex: 0.2,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="orderHistory_item-status">
            <p>{row.statusDTO.name}</p>
          </div>
        );
      },
    },
    {
      field: "total",
      headerName: "Tổng tiền",
      // width: 130,
      align: "center",
      sortable: false,
      headerAlign: "center",
      align: "center",
      height: 70,
      flex: 0.15,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="orderHistory_item-total">
            <p> {row.total.toLocaleString()} VND</p>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      // width: 190,
      flex: 0.25,
      sortable: false,
      height: 70,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className={"orderHistory_item-action"}>
            <div onClick={() => navigate(`/manage/order/${row.id}`)}>
              <NotesIcon />
              <p>Xem chi tiết</p>
            </div>
            {row.statusDTO.name == "Waiting" ? (
              <div onClick={() => handleStatusOrder(row.id, 7)}>
                <DoneIcon />
                <p>Xác nhận đơn hàng</p>
              </div>
            ) : row.statusDTO.name == "Confirmed" ? (
              <div onClick={() => handleStatusOrder(row.id, 8)}>
                <DoneIcon />
                <p>Vận chuyển</p>
              </div>
            ) : row.statusDTO.name == "Delivering" ? (
              <div onClick={() => handleStatusOrder(row.id, 9)}>
                <DoneIcon />
                <p>Hoàn tất đơn hàng</p>
              </div>
            ) : (
              <></>
            )}
            {row.statusDTO.name == "Waiting" ? (
              <div onClick={() => handleStatusOrder(row.id, 6)}>
                <CloseIcon />
                <p>Huỷ đơn hàng</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="orderHistoryTable">
      <Box
        ref={boxRef}
        style={{
          width: "100%",
          height: "auto",
          overflow: "auto",
        }}
      >
        <DataGrid
          rows={list}
          columns={comlumnOrder}
          hideFooter
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          // checkboxSelection
          disableSelectionOnClick
          rowHeight={120}
          localeText={customLocaleText}
        />
      </Box>
      {totalPages > 0 ? (
        <div className="manage__pagination">
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationChange}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default OrderManagerTable;
