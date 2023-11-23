import { DocsRenderer } from "./renderer";

const DocsPage = async () => {
    const response = await fetch(
        "https://gist.githubusercontent.com/loliallen/3b75bddf169c615eef12c1b87a17abd8/raw",
        {
            cache: "no-cache",
        },
    );

    const text = await response.text();
    return <DocsRenderer content={text} />;
};
export default DocsPage;
