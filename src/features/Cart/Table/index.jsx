import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Grid, Pagination } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteProductFromCartThunk,
  getCartThunk,
  updateQuantityThunk,
} from "../../../store/action/cart";
const CartTable = ({
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

  const addQuantity = (quantity, stock, id) => {
    if (quantity < stock) {
      const formData = new FormData();
      formData.append("quantity", quantity + 1);
      formData.append("product_id", id);
      dispatch(updateQuantityThunk(formData)).then((res) => {
        onChildAction();
        // dispatch(getCartThunk([no, limit]));
      });
    }
  };
  const subtractQuantity = (quantity, id) => {
    if (quantity >= 1) {
      const formData = new FormData();
      formData.append("quantity", quantity - 1);
      formData.append("product_id", id);
      dispatch(updateQuantityThunk(formData)).then((res) => {
        onChildAction();
        // dispatch(getCartThunk([no, limit]));
      });
    }
  };
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
  const handleDeteleCartItem = (id) => {
    dispatch(deleteProductFromCartThunk(id)).then((res) => {
      toast.success("Xoá sản phẩm ra khỏi giỏ hàng thành công", {
        position: "top-right",
        autoClose: 3000,
        style: { color: "green", backgroundColor: "#DEF2ED" },
      });
      onChildAction();
    });
  };
  const customLocaleText = {
    noRowsLabel: "Hiện chưa sản phẩm nào",
    // You can customize other localization strings here as well
  };
  const handlePaginationChange = (event, page) => {
    onPageChange(page); // Send the selected page number to the parent
  };
  const comlumnCart = [
    {
      field: "image",
      headerName: "",
      // width: 70,

      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.2,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="cart_item-img">
            <img
              src={`http://localhost:4000/uploads/${row?.productDTO?.itemDTO?.imageDTO[0]?.name}`}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "content",
      headerName: "Sản phẩm",
      // width: 360,
      flex: 0.3,
      height: 70,
      sortable: false,
      // align: 'center',
      headerAlign: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <div>
            <p className="cart_item-name">
              {row?.productDTO?.itemDTO?.data?.name}
            </p>
            <p className="cart_item-name">
              Kích thước:
              <span> {row?.productDTO?.sizeDTO?.info_size}</span>
            </p>
            <p className="cart_item-type">
              Loại sản phẩm:
              <span> {row?.productDTO?.itemDTO?.data?.type_id}</span>
            </p>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Đơn giá",
      // width: 130,
      align: "center",
      sortable: false,
      headerAlign: "center",
      align: "center",
      height: 70,
      flex: 0.1,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div>
            {row?.productDTO?.priceDTO[0]?.discounted_price !==
            row?.productDTO?.priceDTO[0]?.price ? (
              <div className="flex-col">
                <span className="text-lg font-bold text-color-second">
                  {row?.productDTO?.priceDTO[0]?.discounted_price.toLocaleString()}{" "}
                  VND
                </span>
                <span className="ml-2 line-through text-main">
                  {row?.productDTO?.priceDTO[0]?.price.toLocaleString()} VND
                </span>
              </div>
            ) : (
              <p className="text-main">
                {" "}
                {row?.productDTO?.priceDTO[0]?.price.toLocaleString()} VND
              </p>
            )}
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      // width: 190,
      flex: 0.15,
      sortable: false,
      height: 70,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <div
            className={"cart_item-quantity"}
            style={{ display: "flex", alignItems: "center" }}
          >
            <RemoveOutlinedIcon
              onClick={() => subtractQuantity(row.quantity, row.productDTO.id)}
            />
            <p>
              <span>{row.quantity}</span>
            </p>
            <AddOutlinedIcon
              onClick={() =>
                addQuantity(
                  row.quantity,
                  row?.productDTO?.stockDTO[0]?.stock,
                  row.productDTO.id
                )
              }
            />
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Tồn kho",
      // width: 190,
      flex: 0.15,
      sortable: false,
      height: 70,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <div
            className={"cart_item-stock"}
            style={{ display: "flex", alignItems: "center" }}
          >
            {row?.productDTO?.stockDTO[0]?.stock}
          </div>
        );
      },
    },
    {
      field: "total",
      headerName: "Tổng tiền",
      // width: 160,
      flex: 0.1,
      sortable: false,
      height: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <div>
            <p>
              {" "}
              <span>
                {(
                  row.quantity * row?.productDTO?.priceDTO[0]?.discounted_price
                ).toLocaleString()}{" "}
                VND
              </span>
            </p>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      // width: 160,
      flex: 0.1,
      sortable: false,
      height: 70,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <div
            onClick={() => handleDeteleCartItem(row.productDTO.id)}
            className="cart_item-button"
          >
            <DeleteIcon />
          </div>
        );
      },
    },
  ];
  return (
    <div className="cartTable">
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
          columns={comlumnCart}
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

export default CartTable;
