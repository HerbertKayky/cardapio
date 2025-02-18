import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getProducts() {
  const products = await prisma.product.findMany();
  console.log(products);
}

getProducts();
