import { TopBar } from "./TopBar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="fixed inset-0 flex flex-col bg-[#0D1B2A]">
      <div className="flex-shrink-0">
        <TopBar />
      </div>
      <div className="overflow-y-auto flex-1 p-8">{children}</div>
    </div>
  );
}

export default Layout;
