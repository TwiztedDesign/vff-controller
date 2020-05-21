import {JsonDocs, JsonDocsComponent} from "../docs";

const docsLayout = {
  order: [
    "tag",
    "description",
    "example",
    "props",
    "methods"
  ]
};

const getData = function (component: JsonDocsComponent, name: string) {
  let result;
  switch (name) {
    case "description":
      result = component['docsTags'].find(dtag => dtag.name === name);
      return result && result.text;
    case "example":
      result = component['docsTags'].find(dtag => dtag.name === name);
      return result && result.text;
    default:
      return component[name];
  }
};

export const generateComponentDocs = (docs: JsonDocs) => {
  docs.components.forEach(component => {
    docsLayout.order.forEach(dl => {
      console.log(getData(component, dl));
    });
  });
};
