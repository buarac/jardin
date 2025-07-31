import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSwitch } from '@/components/ThemeSwitch';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Baštouille',
  description: 'Suivi des récoltes de fruits et légumes du jardin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="p-4 border-b bg-background">
            <ThemeSwitch />
          </div>
          <main className="p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}