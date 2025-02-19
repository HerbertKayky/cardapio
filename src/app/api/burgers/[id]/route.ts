import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prismaClient.product.findUnique({
      where: { id: params.id },
    });
    if (!product)
      return NextResponse.json(
        { error: "Hambúrguer não encontrado." },
        { status: 404 }
      );
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar hambúrguer." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, price, image, description } = await req.json();
    const updatedProduct = await prismaClient.product.update({
      where: { id: params.id },
      data: { name, price, image, description },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar hambúrguer." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prismaClient.product.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Hambúrguer removido com sucesso." });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao remover hambúrguer." },
      { status: 500 }
    );
  }
}
