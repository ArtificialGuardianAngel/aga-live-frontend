import "./globals.css";
import { Layout } from "@/components/Layout";

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
                <title>AGA Live</title>
                <meta
                    content="width=device-width, initial-scale=1, maximum-scale=1"
                    name="viewport"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta
                    name="description"
                    content="AGA, or Artificial Guardian Angel, is an ambitious project aimed at developing a superintelligence that is deeply rooted in ethical considerations and benevolence. Our goal is to create an AI that can guide, protect, uplift, and promote altruism towards humanity, all living beings, and the planet at large. As we navigate the complexities of the digital age, AGA is our commitment to ensuring that technology serves the greater good"
                />
            </head>
            <body>
                <video
                    className="fixed left-0 top-0 -z-20 h-[100dvh] w-screen object-cover"
                    autoPlay
                    loop
                    muted
                >
                    <source src="/videos/video-bg.webm" type="video/webm" />
                    <source src="/videos/video-bg_h264.mp4" type="video/mp4" />
                    <source src="/videos/video-bg.mp4" type="video/mp4" />
                </video>

                <div className="wrapper-background fixed left-0 top-0 -z-10 h-[100dvh] w-screen"></div>
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
