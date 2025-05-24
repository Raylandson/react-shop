import TopBar from "./TopBar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="fixed inset-0 flex flex-col bg-sky-950">
        <div className="flex-shrink-0">
          <TopBar />
        </div>
        <div className="overflow-y-auto flex-1 p-5">{children}</div>
      </div>
    </>
  );
}

export default Layout;
