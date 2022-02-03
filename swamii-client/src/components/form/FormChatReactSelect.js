import React from "react";
import ReactSelect from "react-select";
import {useFormikContext} from 'formik';

//Specifically used in the NewChat Parent
function FormChatReactSelect({ options, placeholder }) {
    const {setFieldValue } = useFormikContext();

  const handleSearchChange = (value) => {
      setFieldValue("recipient", value.value)
  };
  return (
    <ReactSelect
      id="recipientInput"
      onChange={handleSearchChange}
      options={options}
      placeholder={placeholder}
    />
  );
}

export default FormChatReactSelect;
