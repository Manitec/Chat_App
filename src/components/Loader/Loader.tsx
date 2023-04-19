import React, { RefObject } from "react";
import { FaDiscourse } from "react-icons/fa";

interface LoaderProps {
  ref?: RefObject<HTMLAnchorElement>;
}

export const Loader: React.FC<LoaderProps> = ({ ...props }) => {
  return <FaDiscourse className="fill-black/80 animate-loading" size="70px" />;
};
