"use client";
import React, { useContext } from "react";
import { Ellipse, EllipseDown } from "../../_atoms";
import { GlobalContext } from "@/app/context/Context";
import TabletEllipse from "../../_atoms/tabletEllipse/TabletEllipse";
import DesktopEllipse from "../../_atoms/desktopEllipse/DesktopEllipse";

function HomePage() {
  const context = useContext(GlobalContext);
  if (!context) return;
  const { isTablet, isDesktop } = context;
  return (
    <div className="">
      {isTablet ? (
        <TabletEllipse />
      ) : isDesktop ? (
        <DesktopEllipse />
      ) : (
        <Ellipse />
      )}
      <div className="absolute bottom-[-230px] right-0">
        {isDesktop && <EllipseDown />}
      </div>
    </div>
  );
}

export default HomePage;
