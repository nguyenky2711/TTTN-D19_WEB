import React, { useState } from "react";
import { Form, Input, Button, Rate, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloudUploadOutlined } from "@ant-design/icons";
import "./style.scss";
import { useDispatch } from "react-redux";
import {
  getOrderDetailThunk,
  updateReivewThunk,
} from "../../../../store/action/order";
import { toast } from "react-toastify";
import useSelection from "antd/es/table/hooks/useSelection";
import { useParams } from "react-router-dom";

const ReviewModal = ({ onCancel, data, onReview }) => {
  const maxSize = 25 * 1024 * 1024; // 25MB in bytes
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const item_id = data?.productDTO?.itemDTO?.data?.id;
  const [fileList, setFileList] = useState([]);

  const beforeUpload = async (file) => {
    if (file.size > maxSize) {
      message.error("File size must be within 25MB!");
      return false; // Prevent file from being uploaded
    }
    if (file.type != "") {
      if (!file.type.match(/image\/.*/)) {
        message.error("Only accept image!");
        return false; // Prevent file from being uploaded
      }
    } else {
      if (!file.name.endsWith(".heif")) {
        message.error("Only accept image!");
        return false;
      }
    }
    return false; // Allow file upload
  };

  const handleUploadChange = async (info) => {
    if (info.file.status === "done") {
      // File upload was successful
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      // File upload failed
      message.error(`${info.file.name} file upload failed.`);
    }

    // Keep only the latest file in the fileList
    const latestFile =
      info.fileList.length > 0 ? [info.fileList[info.fileList.length - 1]] : [];

    // Filter valid files based on type and size
    const validFiles = latestFile.filter(
      (file) => file.type.match(/^image\//) && file.size < maxSize
    );

    setFileList(validFiles);
  };

  const handleRemove = (file) => {
    // Filter out the removed file from the fileList
    const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(updatedFileList);
  };
  const onFinish = (values) => {
    const upload = values?.upload?.fileList;
    const sendData = new FormData();
    sendData.append("rating", parseInt(values.rating));
    sendData.append("text", values.text ? values.text : null);
    sendData.append(
      "imageUrl",
      upload?.length > 0
        ? upload.length === 2
          ? upload[1].thumbUrl
          : upload[0].thumbUrl
        : null
    );
    sendData.append("item_id", parseInt(item_id));

    dispatch(updateReivewThunk(sendData)).then((res) => {
      if (res?.payload?.message === "Review updated successfully") {
        toast.success("Đánh giá thành công", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "green", backgroundColor: "#D7F1FD" },
        });
        onReview();
      } else {
        toast.error("Đánh giá thất bại", {
          position: "top-right",
          autoClose: 3000,
          style: { color: "red", backgroundColor: "#D7F1FD" },
        });
      }
    });

    // Add logic to handle form submission here
    form.resetFields();
    setFileList();
    onCancel(); // Close the modal after form submission
  };

  return (
    <div className="reviewModal_container">
      <div className="itemInfor">
        <div className="itemImg">
          <img src={`${data.productDTO.itemDTO.imageDTO[0].url}`} alt="" />
        </div>
        <div className="itemContent">
          <div className="itemName">
            <p>
              {data.productDTO.itemDTO.data.name} -{" "}
              {data.productDTO.sizeDTO.info_size}
            </p>
          </div>
          <div className="itemType">
            <p>
              Loại: {data.productDTO.itemDTO.data.type_id == 1 ? "Cây" : "Chậu"}
            </p>
          </div>
        </div>
      </div>
      <Form onFinish={onFinish} form={form} className="reviewForm">
        <div className="itemRate">
          <Form.Item
            label=""
            name="rating"
            rules={[{ required: true, message: "Hãy đánh giá sản phẩm!" }]}
          >
            <Rate />
          </Form.Item>
        </div>

        <Form.Item
          label=""
          name="text"
          rules={[
            { required: false },
            {
              validator: (_, value) => {
                if (value && value.trim()) {
                  if (value.trim() == "<p><br></p>") {
                    return Promise.reject("Vui lòng chia sẻ về sản phẩm này");
                  }
                  if (value.trim().length > 200) {
                    return Promise.reject("Vui lòng nhập tối đa 200 kí tự");
                  }
                  if (value.trim().length < 10) {
                    return Promise.reject("Vui lòng nhập tối thiểu 10 kí tự");
                  }
                  return Promise.resolve();
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <TextArea
            placeholder="Hãy chia sẻ về sản phẩm này nhé"
            allowClear
            rows={3}
          />
        </Form.Item>
        <div className="itemImg">
          <Form.Item
            className="product_picture"
            label="Hình ảnh muốn chia sẻ"
            name={"upload"}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Upload
              listType="picture"
              beforeUpload={beforeUpload}
              fileList={fileList ? fileList : null}
              onRemove={handleRemove} // Handle file removal
              onChange={handleUploadChange} // Handle file addition to fileList
            >
              <Button icon={<CloudUploadOutlined />}>
                <span className="img_allowText">{`Hãy chia sẽ hình ảnh!`}</span>
              </Button>
            </Upload>
          </Form.Item>
        </div>
        <div className="buttonGroup">
          <Form.Item className="cancelBtn">
            <Button
              type="button"
              onClick={() => {
                onCancel();
                form.resetFields();
                setFileList();
              }}
            >
              Huỷ
            </Button>
          </Form.Item>
          <Form.Item className="submitBtn finish">
            <Button
              type="submit"
              htmlType="submit"
              // onClick={() => !hadErrors && setOpenModal(true)}
            >
              Đánh giá
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ReviewModal;
