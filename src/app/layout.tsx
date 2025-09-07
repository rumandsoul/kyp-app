// src/app/layout.tsx
export const metadata = { title: 'KYP App' };

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui' }}>{children}</body>
    </html>
  );
}
