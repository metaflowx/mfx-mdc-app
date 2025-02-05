import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import { subheading } from "@/constants/fonts";
import { Prompt } from 'next/font/google';
import 'animate.css';

// Importing Prompt font
const prompt = Prompt({
    subsets: ['latin'], // Optional
    weight: '400',      // Optional
});

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={prompt.className}>
            <body
                className={cn(
                    "min-h-screen text-foreground antialiased font-heading overflow-x-hidden !scrollbar-hide",
                    
                )}
            >
                <Toaster richColors theme="dark" position="top-right" />
                {children}
            </body>
        </html>
    );
};
