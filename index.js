const fs = require("fs");

const FILE_PATH = "./generated.csv";
const ROW_NUMBER = 25000;

// // // // //

const generateEmptyValue = () => "";

// TODO: add min-max length
const generateString = (length) => () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";
  for (let i = 0; i < length; i += 1) {
    const randomChar = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    result += randomChar;
  }

  return result;
};

const removeTrailingComma = (str) => {
  // TODO: check if there is a trailing comma
  return str.substr(0, str.length - 1);
};

const addNewLineChar = (str) => {
  return str + "\n";
};

const COLUMNS = [
  {
    name: "id",
    generator: generateString(20),
  },
  {
    name: "name",
    generator: generateString(12),
  },
  {
    name: "phone_number",
    generator: generateEmptyValue,
  },
  {
    name: "email",
    generator: generateString(5),
  },
  {
    name: "region",
    generator: () => 'r',
  }
];

let result = "";

let header = "";
COLUMNS.forEach(({ name }, index) => {
  header += `${name},`;
});
header = removeTrailingComma(header);
header = addNewLineChar(header);
result += header;

for (let i = 1; i <= ROW_NUMBER; i += 1) {
  // TODO: add default generator (string if not provided maybe)
  let row = "";
  COLUMNS.forEach(({ generator }) => {
    const randomValue = generator(i);
    row += `${randomValue},`;
  });
  row = removeTrailingComma(row);
  row = addNewLineChar(row);
  result += row;
}

// TODO: check if file exists at the given path
fs.writeFile(FILE_PATH, result, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log(`The file was saved to path ${FILE_PATH}`);
});
