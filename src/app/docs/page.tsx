import { join } from "path";
import { readFileSync } from "fs";
import { DocsRenderer } from "./renderer";
// import { Light } from "react-syntax-highlighter";

const DocsPage = async () => {
    const response = await fetch(
        "https://gist.githubusercontent.com/loliallen/3b75bddf169c615eef12c1b87a17abd8/raw",
    );

    const text = await response.text();
    // return <div dangerouslySetInnerHTML={{ __html: marked(fileContent) }} />;
    return <DocsRenderer content={text} />;
};
export default DocsPage;
