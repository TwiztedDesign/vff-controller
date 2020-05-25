import {JsonDocsComponent} from "../docs";
import {MethodObjectDocumentation, PropertyObjectDocumentation} from "./interfaces";

const docsLayout = {
  "title": "title",
  "description": "text",
  "example": "code",
  "properties": "table",
  "methods": "table"
};
const discreetParams = [
  "dirPath"
];
const propObject: PropertyObjectDocumentation = {Name: '', Type: '', Default: '', Description: ''};
const methodObject: MethodObjectDocumentation = {Name: '', Parameters: '', Returns: '', Description: ''};

/**
 * Locations and type of the properties in Jsdoc can be different and it's not always
 * flat or a simple object.
 * This function should handle different extraction types.
 * @param component
 * @param name
 */
export const extractDataFromJsdoc = function (component: JsonDocsComponent, name: string) {
  let result;

  switch (name) {
    case "title":
      return component.tag;

    case "description":
      result = component['docsTags'].find(dtag => dtag.name === name);
      return result && result.text;

    case "example":
      result = component['docsTags'].find(dtag => dtag.name === name);
      return result && result.text;

    case "properties":
      const props = component.props.map((prop) => {
        return Object.keys(propObject)
          .reduce((result, key): PropertyObjectDocumentation => {
            if (key === "Description") {
              result["Description"] = prop['docs'];
            } else {
              result[key] = prop[key.toLowerCase()];
            }
            return result;
          }, Object.create(propObject))
      });
      if (props.length !== 0) {
        return props;
      } else {
        return null;
      }

    case "methods":
      const methods = component.methods.map((method) => {
        return Object.keys(methodObject)
          .reduce((result, key): MethodObjectDocumentation => {
            if (key === 'Description') {
              result[key] = method['docs'];
            } else if (key === 'Parameters') {
              result[key] = method.docsTags.reduce((result, param) => result += param.text + ' ', '');
            } else if (key === 'Returns') {
              result[key] = method.returns.type;
            } else {
              result[key] = method[key.toLowerCase()];
            }
            return result;
          }, Object.create(methodObject));
      });
      if (methods.length !== 0) {
        return methods
      } else {
        return null;
      }

    default:
      return component[name];
  }
};

export const extractData = function (component: JsonDocsComponent): object {
  const paramsToExtract = Object.keys(docsLayout).concat(discreetParams);
  const result = {docParts: [], outputPath: ''};

  paramsToExtract.forEach(dl => {
    if (dl === 'dirPath') {
      result.outputPath = extractDataFromJsdoc(component, dl);
    } else {
      const data = extractDataFromJsdoc(component, dl);
      if (data) { // avoid creating object with content: undefined, it will result in undefined in readme.md

        if (dl === 'properties' || dl === 'methods') {
          result.docParts.push({
            config: {
              type: 6
            },
            part: 'title',
            content: (dl.charAt(0).toUpperCase() + dl.slice(1))
          })
        }

        result.docParts.push({
          config: {
            textTransform: {
              capitalize: (dl === 'properties' || dl === 'methods')
            }
          },
          part: docsLayout[dl],
          content: data
        })
      }
    }
  });
  return result;
};
