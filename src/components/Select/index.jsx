import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./styles.scss";
import { useEffect, useState } from "react";

export default function SelectCustom({
  label,
  id,
  className,
  children,
  defaultValue = null,
  setValue,
  onChange,
  register = false,
  options = [],
  placeholder,
  requirementField = true,
  dispatch = () => {},
  action = () => {},
  idProvince,
  disabled = false,
  onClick,
  pd_bt = null,
  type = null,
}) {
  const [newValue, setNewValue] = useState(true);
  const renderSelectOption = () => {
    if (!Array.isArray(options)) {
      return null;
    }
    return options.map((item, key) => {
      return <MenuItem value={item.id}>{item.info_size}</MenuItem>;
    });
  };

  // handle change district
  const handleChangeLocation = (idProvinceChange) => {
    dispatch(action(idProvinceChange));
  };
  useEffect(() => {
    setNewValue(true);
  }, []);

  return (
    <>
      <div
        className={`select-form ${className ? className : ""}`}
        style={pd_bt && { paddingBottom: pd_bt }}
      >
        <h1 className="select-label">
          {label}
          {requirementField && <span className="field-requirment">*</span>}
        </h1>
        <FormControl
          className="select-formControl"
          disabled={disabled}
          fullWidth
        >
          <Select
            className="select-field"
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={defaultValue}
            // value={defaultValue}
            onClick={onClick}
            {...register(id)}
          >
            {type === "size"
              ? options.map((item, key) => {
                  return <MenuItem value={item.id}>{item.info_size}</MenuItem>;
                })
              : type === "productImport"
              ? options.map((item, key) => {
                  return <MenuItem value={item.id}>{item.name}</MenuItem>;
                })
              : options.map((item, key) => {
                  return <MenuItem value={item.id}>{item.value}</MenuItem>;
                })}
          </Select>
        </FormControl>
        <p className="select-error">{children}</p>
      </div>
    </>
  );
}
