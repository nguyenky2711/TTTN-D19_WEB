import React, { useEffect, useRef } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import NotesIcon from "@mui/icons-material/Notes";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import moment from "moment";
import {
  changeStatusAccountThunk,
  getUsersThunk,
} from "../../../../store/action/manage";
const ManageUserTable = ({
  list,
  listHavePages,
  onPageChange,
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
  const handleStatusAccount = (user_id, status_id) => {
    const sendData = new FormData();
    sendData.append("user_id", user_id);
    sendData.append("status_id", status_id == "1" ? 2 : 1);
    dispatch(changeStatusAccountThunk(sendData)).then((res) => {
      dispatch(getUsersThunk([no, limit])).then((res) => {});
    });
  };
  const handlePaginationChange = (event, page) => {
    onPageChange(page); // Send the selected page number to the parent
  };
  const columnUser = [
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
      headerName: "Họ và tên",
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
            <p>{row.name}</p>
          </div>
        );
      },
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
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
            <p>{row.phone}</p>
          </div>
        );
      },
    },
    {
      field: "address",
      headerName: "Địa chỉ",
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
            <p>{row.address}</p>
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "email",
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
            <p>{row.email}</p>
          </div>
        );
      },
    },
    {
      field: "active",
      headerName: "Trạng thái tài khoản",
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
          <div className={"user_item-action"}>
            {row.statusDTO.id == 1 ? (
              <div
                onClick={() => handleStatusAccount(row.id, row.statusDTO.id)}
              >
                <LockIcon />
                <p> Khoá tài khoản</p>
              </div>
            ) : (
              <div
                onClick={() => handleStatusAccount(row.id, row.statusDTO.id)}
              >
                <LockOpenIcon />
                <p> Mở tài khoản</p>
              </div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="manageUserTable">
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
          columns={columnUser}
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

export default ManageUserTable;
