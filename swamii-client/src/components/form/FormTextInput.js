import React from "react";
import { useFormikContext } from "formik";


import AppErrorMessage from "./FormErrorMessage";
import AppTextInput from "../generic/AppTextInput";

function FormTextInput({ name, ...otherTextInputProps }) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();

  return (
    <div>
      <AppTextInput
        onChange={(event) => setFieldValue(name, event.target.value) }
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        {...otherTextInputProps}
      />
      {errors[name] && touched[name] ? null : <h6> </h6>}
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
}

export default FormTextInput;
