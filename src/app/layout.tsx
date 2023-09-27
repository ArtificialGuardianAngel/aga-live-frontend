import "./globals.css";
import Layout from "@/layout/DefaultLayout";

export const metadata = {
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>{"AGA Live"}</title>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta
                    name="description"
                    content="AGA, or Artificial Guardian Angel, is an ambitious project aimed at developing a superintelligence that is deeply rooted in ethical considerations and benevolence. Our goal is to create an AI that can guide, protect, uplift, and promote altruism towards humanity, all living beings, and the planet at large. As we navigate the complexities of the digital age, AGA is our commitment to ensuring that technology serves the greater good"
                />
            </head>
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
