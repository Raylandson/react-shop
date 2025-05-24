interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="fixed inset-0 flex flex-col bg-sky-950 pt-8">
      {children}
    </div>
  );
}

export default Layout;
