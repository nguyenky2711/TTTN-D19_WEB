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
// import {
//   changeStatusOrderThunk,
//   getOrdersThunk,
// } from "../../../../store/action/order";
const UserOrderDetailTable = ({
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
    // dispatch(changeStatusOrderThunk(sendData)).then((res) => {
    //   dispatch(getOrdersThunk());
    // });
  };
  const handlePaginationChange = (event, page) => {
    onPageChange(page); // Send the selected page number to the parent
  };
  const comlumnOrderDetail = [
    {
      field: "name",
      headerName: "Tên sản phẩm",
      // width: 70,

      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.15,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="product_item-name">
            <p>{row.productDTO.itemDTO.data.name}</p>
          </div>
        );
      },
    },
    {
      field: "type",
      headerName: "Loại sản phẩm",
      // width: 70,

      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.1,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="product_item-type_id">
            <p>{row.productDTO.itemDTO.data.type_id}</p>
          </div>
        );
      },
    },
    {
      field: "image",
      headerName: "Ảnh sản phẩm",
      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.1,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="product_item-image">
            <img
              src={`http://localhost:4000/uploads/${row.productDTO.itemDTO.imageDTO[0].name}`}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "size",
      headerName: "Kích thước",
      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.1,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="product_item-size">
            <p>{row.productDTO.sizeDTO.info_size}</p>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Đơn giá",
      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.1,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="product_item-stock">
            <p>
              {row?.productDTO?.priceDTO[0]?.discounted_price.toLocaleString()}{" "}
              VND
            </p>
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.1,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="product_item-stock">
            <p>{row?.quantity}</p>
          </div>
        );
      },
    },
    {
      field: "sum",
      headerName: "Tổng",
      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.1,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="product_item-stock">
            <p>{row?.sum.toLocaleString()} VND</p>
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
          columns={comlumnOrderDetail}
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

export default UserOrderDetailTable;
