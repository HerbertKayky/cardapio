import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function GET() {
  try {
    const products = await prismaClient.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar hambúrgueres." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, price, image, description } = await req.json();
    const newProduct = await prismaClient.product.create({
      data: { name, price, image, description },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar hambúrguer." },
      { status: 500 }
    );
  }
}
