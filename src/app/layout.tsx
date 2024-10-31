import type { Metadata } from "next";
import "./resources/scss/common.scss";

export const metadata: Metadata = {
  title: "datamon_view2",
  description: "datamon_view2",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
{children}
      </body>
    </html>
  );
}
