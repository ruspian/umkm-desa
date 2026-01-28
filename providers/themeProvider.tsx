"use client";

import React from "react";
import { ThemeProvider as ThemeProvider } from "next-themes";

const Theme = ({
  children,
  ...props
}: React.ComponentProps<typeof ThemeProvider>) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};

export default Theme;
