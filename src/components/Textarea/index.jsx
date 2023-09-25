import "./styles.scss";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Textarea = ({
  label,
  id,
  placeholder,
  children = null,
  register,
  check = false,
  requirementField = true,
  setValue,
  defaultValue,
  textAlign,
  isUpdate = false,
  subtitle,
}) => {
  const [inputVal, setInputVal] = useState(defaultValue);
  useEffect(() => {
    register(id);
  }, [id, register]);

  useEffect(() => {
    setValue(id, defaultValue);
  }, [defaultValue, id, setValue]);
  const [showError1, setShowError1] = useState(false);
  const [showError2, setShowError2] = useState(true);
  let errorMessage =
    id == "description"
      ? "* Vui lòng nhập mô tả mặt hàng"
      : id == "guide"
      ? "* Vui lòng nhập hướng dẫn sử dụng"
      : null;

  const handleOnChange = (content, delta, source, editor) => {
    console.log(editor.getText()?.length);
    if (editor.getText()?.length <= 1) {
      if (id == "description" || id == "guide") {
        setShowError1(true);
        setShowError2(true);
      }
    } else {
      setShowError1(false);
      setShowError2(false);
    }
    setInputVal(content.replace(/<\/?p>/g, ""));
    setValue(id, content.replace(/<\/?p>/g, ""));
  };
  return (
    <>
      <div
        style={{
          textAlign: textAlign ? textAlign : "",
          // hover: hover ? hover : "",
        }}
        className="custom-textarea"
      >
        <label htmlFor={id} className="custom-textarea__label">
          {label}
          {requirementField && <span className="field-requirment">*</span>}
        </label>
        <div
          // id={id}
          className={
            check
              ? "custom-input__textarea-disabled"
              : "custom-textarea__textfield"
          }
        >
          <ReactQuill
            theme="snow"
            onChange={handleOnChange}
            placeholder={placeholder}
            // value={value}
            // id={id}
            // {...register(id)}
            // value={defaultValue || ""}
            defaultValue={defaultValue}
          />
          {check ? null : (
            <p
              className="custom-textarea__error"
              id={id}
              style={{ fontSize: "13px", color: "red" }}
            >
              {(children === null
                ? showError1
                  ? errorMessage
                  : ""
                : showError2
                ? children
                : "") || (
                <span
                  style={{
                    marginTop: "2px",
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "#555",
                  }}
                >
                  {subtitle}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Textarea;
