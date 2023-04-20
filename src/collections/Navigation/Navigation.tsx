import { Button, Logo, Popup } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { RefObject } from "react";
import { togglePopup } from "services";

interface NavigationProps {
  ref?: RefObject<HTMLButtonElement>;
}
export const Navigation: React.FC<NavigationProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
     </nav>
  );
};
