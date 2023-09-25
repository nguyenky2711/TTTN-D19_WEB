// import './styles.scss';

export const FileUpload = ({
  text = "Chỉ hỗ trợ file JPG, PNG. Kích thước tối đa 512KB.",
  img,
  format,
}) => {
  return (
    <>
      <div className="file-upload">
        <img
          src={
            img === ""
              ? "https://img.icons8.com/clouds/180/000000/file.png"
              : img
          }
          alt=""
          className="file-upload__img"
        />
        {img === "" && (
          <p className="file-upload__text">
            <span style={{ color: "red" }}>*</span>
            {text}
          </p>
        )}
      </div>
    </>
  );
};
