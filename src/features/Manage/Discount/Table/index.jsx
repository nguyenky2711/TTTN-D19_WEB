import React, { useEffect, useRef } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import NotesIcon from "@mui/icons-material/Notes";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import {
  changeStatusAccountThunk,
  getUsersThunk,
  updateDiscountThunk,
} from "../../../../store/action/manage";
const ManageDiscountTable = ({
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
    noRowsLabel: "Hiện chưa có khách hàng nào",
    // You can customize other localization strings here as well
  };

  const handleDeleteDiscount = (value) => {
    // const sendData = {
    //   condition: value.condition,
    //   maxGet: value.maxGet,
    //   status_id: 2,
    // };
    const sendData = new FormData();
    sendData.append("condition", value.condition);
    sendData.append("maxGet", value.maxGet);
    sendData.append("status_id", 2);
    dispatch(updateDiscountThunk([value.id, sendData])).then((res) => {
      if (res?.payload?.message == "Update successfully") {
        toast.success("Xoá khuyến mãi thành công", {
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
  const columnDiscount = [
    {
      field: "id",
      headerName: "ID",
      // width: 70,

      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.1,
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
      field: "name",
      headerName: "Tên khuyến mãi",
      // width: 70,

      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.25,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="orderHistory_item-name">
            <p>
              Giảm ${row.maxGet} cho hoá đơn từ ${row.condition}
            </p>
          </div>
        );
      },
    },
    {
      field: "condition",
      headerName: "Điều kiện",
      // width: 70,

      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.25,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="orderHistory_item-name">
            <p>{row.condition}</p>
          </div>
        );
      },
    },
    {
      field: "maxGet",
      headerName: "Giảm tối đa",
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
            <p>{row.maxGet}</p>
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
          <div className={"discount_item-action"}>
            <div>
              <div onClick={() => navigate(`/manage/discount/${row.id}`)}>
                <NotesIcon />
                <p>Xem chi tiết</p>
              </div>
              {row.statusDTO.name == "Active" ? (
                <div onClick={() => handleDeleteDiscount(row)}>
                  <CloseIcon />
                  <p>Xoá khuyến mãi</p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="manageDiscountTable">
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
          columns={columnDiscount}
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

export default ManageDiscountTable;
