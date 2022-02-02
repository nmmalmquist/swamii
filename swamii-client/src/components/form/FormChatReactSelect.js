import React from "react";
import ReactSelect from "react-select";
import {useFormikContext} from 'formik';

//Specifically used in the NewChat Parent
function FormChatReactSelect({ options, placeholder }) {
    const {values, setFieldValue } = useFormikContext();

  const handleSearchChange = (value) => {
      setFieldValue("recipient", value.value)
  };
  console.log(values)
  return (
    <ReactSelect
      onChange={handleSearchChange}
      options={options}
      placeholder={placeholder}
    />
  );
}

export default FormChatReactSelect;
