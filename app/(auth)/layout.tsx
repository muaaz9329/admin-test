export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen h-full bg-wave-primary bg-bottom bg-no-repeat bg-contain">
      <div className="h-full container flex items-center justify-center py-8">
        {children}
      </div>
    </main>
  );
}
