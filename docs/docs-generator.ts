import {JsonDocs} from "../docs";
import {extractData} from "./json-docs-data-extractor";
import {createReadme} from "./readme-creator";

/****************************************************
 *                Public module interface
 ****************************************************/

export const generateReadme = (docs: JsonDocs) => {
  docs.components
    .map(extractData)
    .forEach(file => createReadme(file));
};

// 1. extract needed data from jsdoc
// 2. move the data to readme generator
