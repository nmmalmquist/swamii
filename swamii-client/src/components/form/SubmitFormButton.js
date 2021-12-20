import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../generic/AppButton";

function SubmitFormButton({ title, ...otherProps }) {
  const { handleSubmit} = useFormikContext();

  return <AppButton title={title} onClick={handleSubmit} {...otherProps} />;
}

export default SubmitFormButton;
