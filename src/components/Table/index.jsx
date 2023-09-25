import { Box, Button, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import NotesIcon from "@mui/icons-material/Notes";
import EditIcon from "@mui/icons-material/Edit";
import { deleteItemThunk } from "../../store/action/product";
import ModalPrice from "../../features/Manage/Product/Modal";
const Table = ({
  list,
  listHavePages,
  onChange,
  no,
  reload,
  type,
  arrData = null,
  sendFlagToGrandparent,
}) => {
  const boxRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(1);
  const addQuantity = () => {
    const temp = cartQuantity + 1;
    setCartQuantity(temp);
  };

  const subtractQuantity = () => {
    if (cartQuantity > 1) {
      const temp = cartQuantity - 1;
      setCartQuantity(temp);
    }
  };
  useEffect(() => {
    if (boxRef.current) {
      const rowHeight = 170; // Chiều cao của mỗi hàng
      const numberOfRows = list.length; // Số lượng hàng
      const rowHeightPlus = 58; // Chiều cao của header

      const newHeight = rowHeight * numberOfRows;
      if (numberOfRows == 0) {
        boxRef.current.style.height = `${100}px`;
      } else {
        boxRef.current.style.height = `${newHeight + rowHeightPlus}px`;
      }
    }
  });
  const customLocaleText = {
    noRowsLabel: "Hiện chưa sản phẩm nào",
    // You can customize other localization strings here as well
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
        console.log(row?.productDTO?.itemDTO?.imageDTO[0]?.name);
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
            <p>
              $ <span>{row?.productDTO?.priceDTO[0]?.price}</span>
            </p>
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
            <RemoveOutlinedIcon onClick={subtractQuantity} />
            <p>
              <span>{row.quantity}</span>
            </p>
            <AddOutlinedIcon onClick={addQuantity} />
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
              ${" "}
              <span>{row.quantity * row?.productDTO?.priceDTO[0]?.price}</span>
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
          <div onClick={handleDeteleCartItem} className="cart_item-button">
            <DeleteIcon />
          </div>
        );
      },
    },
  ];
  const comlumnOrder = [
    {
      field: "id",
      headerName: "Mã đặt hàng",
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
      field: "created_at",
      headerName: "Thời gian đặt đơn",
      // width: 360,
      flex: 0.3,
      height: 70,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="orderHistory_item-time">
            <p>{row.created_at}</p>
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
            <p>{row.total}</p>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "",
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
            <div>
              <NotesIcon />
              <p>Xem chi tiết</p>
            </div>
            <div>
              <DoneIcon />
              <p>Xác nhận đã nhận hàng</p>
            </div>
            <div>
              <CloseIcon />
              <p>Huỷ đơn hàng</p>
            </div>
          </div>
        );
      },
    },
  ];
  const comlumnProduct = [
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
            <p>{row.itemDTO.data.name}</p>
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
            <p>{row.itemDTO.data.type_id}</p>
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
              src={`http://localhost:4000/uploads/${row?.itemDTO?.imageDTO[0]?.name}`}
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
            <p>{row.sizeDTO.info_size}</p>
          </div>
        );
      },
    },
    {
      field: "stock",
      headerName: "Tồn kho",
      align: "center",
      sortable: false,
      headerAlign: "center",
      flex: 0.1,
      height: 70,
      renderCell: (params) => {
        const { row } = params;
        return (
          <div className="product_item-stock">
            <p>{row?.stockDTO[0]?.stock}</p>
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
            <p>{row?.priceDTO[0]?.price}</p>
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
          <div className={"product_item-action"}>
            <div
              onClick={() => navigate(`/manage/product/${row.itemDTO.data.id}`)}
            >
              <NotesIcon />
              <p>Xem chi tiết mặt hàng</p>
            </div>
            <div
              onClick={() =>
                handleOpenModalPrice(row.productId, row.priceDTO[0].price)
              }
            >
              <EditIcon />
              <p>Sửa giá sản phẩm</p>
            </div>
            {/* <div>
              <EditIcon />
              <p>Sửa kích thước sản phẩm</p>
            </div> */}
            {/* <div onClick={() => handleDeteleItem(row.itemDTO.data.id)}>
              <DeleteIcon />
              <p>Xoá sản phẩm</p>
            </div> */}
          </div>
        );
      },
    },
  ];
  const handleDeteleCartItem = () => {
    toast.success("Xoá sản phẩm ra khỏi giỏ hàng thành công", {
      position: "top-right",
      autoClose: 3000,
      style: { color: "green", backgroundColor: "#DEF2ED" },
    });
  };
  const handleDeteleItem = (id) => {
    dispatch(deleteItemThunk(id)).then((res) => {
      toast.success("Xoá mặt hàng thành công", {
        position: "top-right",
        autoClose: 3000,
        style: { color: "green", backgroundColor: "#DEF2ED" },
      });
    });
  };
  const caculateTotalPrice = () => {
    let total = 0;
    for (let index in list) {
      total =
        total +
        list[index].quantity * list[index].productDTO?.priceDTO[0]?.price;
    }
    return total;
  };
  const [openModalPrice, setOpenModalPrice] = useState(false);
  const [oldPrice, setOldPrice] = useState(0);
  const [productId, setProductId] = useState(0);
  const handleOpenModalPrice = (id, value) => {
    console.log(id);
    setOpenModalPrice(true);
    setOldPrice(value);
    setProductId(id);
  };

  const handleCloseModalPrice = () => {
    setOpenModalPrice(false);
    setOldPrice(0);
  };
  const handleChildFlag = (flag) => {
    // Send the flag to the grandparent
    sendFlagToGrandparent(flag);
  };
  // const flattenedList = list.flatMap((innerArray) => innerArray);

  return (
    <div>
      <Box
        ref={boxRef}
        // sx={{ border: 1 }}
        style={{
          width: "100%",
          height: "auto",
          overflow: "auto",
        }}
      >
        {type == "cart" ? (
          <DataGrid
            rows={list}
            columns={comlumnCart}
            hideFooter
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            showCellVerticalBorder
            // checkboxSelection
            disableSelectionOnClick
            rowHeight={120}
            localeText={customLocaleText}
          />
        ) : type == "orderHistory" ? (
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
        ) : type == "product" ? (
          <DataGrid
            rows={list}
            columns={comlumnProduct}
            hideFooter
            disableColumnMenu
            disableColumnFilter
            disableColumnSelector
            // checkboxSelection
            disableSelectionOnClick
            rowHeight={170}
            localeText={customLocaleText}
          />
        ) : (
          <></>
        )}
      </Box>
      {type == "cart" && (
        <div className="cart_totalPrice">
          <p>
            Tổng tiền: $<span>{caculateTotalPrice()}</span>
          </p>
        </div>
      )}
      <ModalPrice
        open={openModalPrice}
        onClose={handleCloseModalPrice}
        oldPrice={oldPrice}
        productId={productId}
        sendFlagToParent={handleChildFlag}
      />
    </div>
  );
};

export default Table;
