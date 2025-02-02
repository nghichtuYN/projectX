import "../../app/globals.css";

export default function AuthLayout({
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
