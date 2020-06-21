import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

export const Main: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <p>Hello World!</p>
    </Fragment>
  );
};
