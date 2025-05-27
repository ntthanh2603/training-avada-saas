import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import products from "./products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function updateFile(productsArray) {
  try {
    const productsFilePath = path.join(__dirname, "products.js");

    let fileContent = `const products = [\n`;

    productsArray.forEach((product, index) => {
      fileContent += `  {\n`;
      fileContent += `    id: ${product.id},\n`;
      fileContent += `    name: "${product.name}",\n`;
      fileContent += `    price: ${product.price},\n`;
      fileContent += `    description: "${product.description}",\n`;
      fileContent += `    product: "${product.product}",\n`;
      fileContent += `    color: "${product.color}",\n`;
      fileContent += `    createdAt: "${product.createdAt}",\n`;
      fileContent += `    image: "${product.image}"\n`;
      fileContent += `  }`;

      if (index < productsArray.length - 1) {
        fileContent += ",";
      }
      fileContent += "\n";
    });

    fileContent += `];\n\nexport default products;`;

    fs.writeFileSync(productsFilePath, fileContent);
    console.log("Updated file products.js success!");
  } catch (error) {
    console.error("Error while updating file products.js:", error);
  }
}

function getAll() {
  return { data: products };
}

function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}

function add(data) {
  try {
    const newProduct = {
      id: data.id,
      name: data.name,
      price: data.price,
      description: data.description,
      product: data.product,
      color: data.color,
      createdAt: data.createdAt || new Date().toISOString(),
      image: data.image,
    };

    products.push(newProduct);

    updateFile(products);

    return "success";
  } catch (error) {
    console.error("Error while add product:", error);
    return "error";
  }
}

function update(id, data) {
  try {
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return "Product not found";
    }

    products[productIndex] = {
      ...products[productIndex],
      ...data,
      id: id,
      createdAt: data.createdAt || products[productIndex].createdAt,
    };

    updateFile(products);

    return products[productIndex];
  } catch (error) {
    console.error("Error while update product:", error);
    return "error";
  }
}

function del(id) {
  try {
    const productIndex = products.findIndex(
      (product) => product.id === parseInt(id)
    );

    if (productIndex === -1) {
      return "Product not found";
    }

    products.splice(productIndex, 1);

    updateFile(products);

    return "Product deleted successfully";
  } catch (error) {
    console.error("Error while deleting product:", error);
    return "error";
  }
}

export { getAll, getOne, add, update, del };
