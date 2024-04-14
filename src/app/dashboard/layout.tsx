export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>포켓몬 백과사전</h1>
      {children}
    </div>
  );
}
