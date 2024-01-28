"use client";

import { NextUIProvider as NextUI } from "@nextui-org/react";

export const NextUIProvider = ({ children }) => {
  return <NextUI>{children}</NextUI>;
};
