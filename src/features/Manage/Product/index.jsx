import React, { useEffect, useState } from "react";
import "./style.scss";

import PostAddIcon from "@mui/icons-material/PostAdd";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListProductThunk } from "../../../store/action/product";
import Shop2Icon from "@mui/icons-material/Shop2";
const ManageProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 100;
  const [flagFromParent, setFlagFromParent] = useState(false);

  const handleParentFlag = (flag) => {
    // Receive the flag from the parent and update state
    setFlagFromParent(flag);
  };
  useEffect(() => {
    dispatch(getListProductThunk([currentPage - 1, limit])).then((res) => {
      setFlagFromParent(false);
    });
  }, [currentPage, flagFromParent]);
  const { productList } = useSelector((state) => state.product.data);
  let idCounter = 0;
  const flatArray = productList.flatMap((innerArray) =>
    innerArray.map((item) => ({ ...item, productId: item.id, id: idCounter++ }))
  );

  const handlePageChange = (page) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="container">
      <div className="manageProduct_container">
        <div className="manageProduct_header">
          <div className="manageProduct_header-left">
            <h4>Danh sách sản phẩm</h4>
          </div>
          <div className="manageProduct_header-right">
            <div
              className="manageProduct_header-right-import"
              onClick={() => navigate(`/manage/product/import`)}
            >
              <Shop2Icon />
              <p>Nhập hàng</p>
            </div>
            <div
              className="manageProduct_header-right-add"
              onClick={() => navigate(`/manage/product/addProduct`)}
            >
              <PostAddIcon />
              <p>Thêm mặt hàng mới</p>
            </div>
          </div>
        </div>
        <div className="manageProduct_table">
          <Table
            list={flatArray}
            className={"productList"}
            type={"product"}
            no={currentPage - 1}
            limit={limit}
            onPageChange={handlePageChange}
            totalPages={totalPages}
            sendFlagToGrandparent={handleParentFlag}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
