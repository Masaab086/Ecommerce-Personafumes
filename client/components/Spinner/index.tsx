import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Spinner: React.FC<{ className?: string }> = ({ className = "" }) => {
  return <ImSpinner2 className={` animate-spin ` + className} />;
};

export default Spinner;
