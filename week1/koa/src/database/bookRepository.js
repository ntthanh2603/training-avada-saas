import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import books from "./books.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function updateBooksFile(booksArray) {
  try {
    const booksFilePath = path.join(__dirname, "books.js");

    let fileContent = `const books = [\n`;

    booksArray.forEach((book, index) => {
      const nameField = book.name ? `, name: "${book.name}"` : "";
      fileContent += `  { id: ${book.id}, author: "${book.author}"${nameField} }`;

      if (index < booksArray.length - 1) {
        fileContent += ",";
      }
      fileContent += "\n";
    });

    fileContent += `];\n\nexport default books;`;

    fs.writeFileSync(booksFilePath, fileContent);
  } catch (error) {
    console.error("Error when update file books.js:", error);
  }
}

function getAllBooks() {
  return { data: books };
}

function getOneBook(id) {
  return books.find((book) => book.id === parseInt(id));
}

function addBook(data) {
  try {
    books.push(data);
    console.log("books", books);

    updateBooksFile(books);

    return "success";
  } catch (error) {
    console.error("Error when add book:", error);
    return "error";
  }
}

export { getAllBooks, getOneBook, addBook };
