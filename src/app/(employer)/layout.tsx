import "../../app/globals.css";

export default function EmployerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="auth-layout ">{children}</div>
    </div>
  );
}
