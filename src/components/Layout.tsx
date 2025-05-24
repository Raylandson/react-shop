import TopBar from "./TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="fixed inset-0 flex flex-col bg-sky-950 pt-8">
        <div className="flex flex-col">
          <TopBar></TopBar>
        </div>
        <div className="mt-16 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}

export default Layout;
