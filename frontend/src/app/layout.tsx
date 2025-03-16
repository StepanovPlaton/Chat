import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const roboto = Roboto({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider enableSystem={false} defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
