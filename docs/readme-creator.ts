import fs from 'fs';

const fileName = 'readme2.md';

enum heading {
  h1 = 1,
  h2,
  h3,
  h4,
  h5,
  h6
}

const arrayToTable = function (array, columns?, alignment = 'center') {
  let table = "";
  const separator = {
    'left': ':---',
    'right': '---:',
    'center': '---'
  };

  // Generate column list
  const cols = columns ? columns.split(",") : Object.keys(array[0]);

  // Generate table headers
  table += cols.join(" | ");
  table += "\r\n";

  // Generate table header seperator
  table += cols.map(function () {
    return separator[alignment] || separator.center
  }).join(' | ');
  table += "\r\n";

  // Generate table body
  array.forEach(function (item) {
    table += cols.map(function (key) {
      return String(item[key] || "")
    }).join(" | ") + "\r\n"
  });

  // Return table
  return table
};

const addLineBreaks = function (text, numOfTimes = 1) {
  return '\n' + text.concat('\n'.repeat(numOfTimes));
};

const template = {
  title: function (text, config?) {
    const titlePrefix = '#'.repeat(config && config.type || heading.h4);
    return `${titlePrefix} ${text}`;
  },

  text: function (text) {
    return `<p>${text}</p>`;
  },

  code: function (text, config?) {
    const type = config && config.type || 'html';
    return '```' + type + ' \n' + text + '\n```';
  },

  table: function (props) {
    if (!(props && props.length && props.length > 0)) return;
    return `${arrayToTable(props, null, 'left')}`;
  }
};

const writeToFile = function (dirPath, docDetails) {
  const markup = docDetails.reduce((outputDoc, markup) => {
    return outputDoc.concat(markup);
  }, '');
  fs.writeFileSync(`${dirPath}/${fileName}`, markup);
};

export const createReadme = function (options) {
  const docParts = options.docParts; // array of contents
  const outputPath: string = options.outputPath;

  writeToFile(outputPath, docParts.map(dc => {
    if (!template[dc.part]) {
      throw Error(`Such template doesn't exists: ${dc.part}`);
    } else {
      const result = template[dc.part](dc.content, dc.config);
      if (result) {
        return addLineBreaks(result);
      } else {
        return null;
      }
    }
  }))
};
