const { readFile } = require("fs/promises");
const { error } = require("./constants");
const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, "utf-8");
    const validation = this.isValid(content);
    if (!validation.valid) throw new Error(validation.error);

    return this.parseCsvToJson(content);
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...rows] = this.splitCsvContentRows(csvString);

    const isHeaderValid = options.fields.join(",") === header;

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false,
      };
    }

    if (!rows.length || rows.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCsvToJson(csvString) {
    const [header, ...rows] = this.splitCsvContentRows(csvString);

    const headerProps = header.split(",");

    const users = rows.map((row) => {
      const columns = row.split(",");
      const user = {};
      for (const index in columns) {
        user[headerProps[index]] = columns[index].trim();
      }
      return user;
    });

    return users;
  }

  static splitCsvContentRows(csvString) {
    return csvString.split(/\r?\n/);
  }
}

module.exports = File;
