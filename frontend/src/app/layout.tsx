import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider enableSystem={false} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
