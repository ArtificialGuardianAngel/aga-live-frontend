import { join } from "path";
import { readFileSync } from "fs";
import { DocsRenderer } from "./renderer";
// import { Light } from "react-syntax-highlighter";

const DocsPage = () => {
    const filePath = join(process.cwd(), "public", "docs.md");
    const fileContent = readFileSync(filePath, 'utf-8');
    // return <div dangerouslySetInnerHTML={{ __html: marked(fileContent) }} />;
    return <DocsRenderer content={fileContent} />;
};
export default DocsPage;
