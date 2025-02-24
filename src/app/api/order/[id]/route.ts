import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params; // Obtém o ID da URL
  
      if (!id) {
        return NextResponse.json(
          { error: "ID do pedido não informado." },
          { status: 400 }
        );
      }
  
      // Verifica se o pedido existe
      const existingOrder = await prisma.order.findUnique({
        where: { id },
        include: { items: true },
      });
  
      if (!existingOrder) {
        return NextResponse.json(
          { error: "Pedido não encontrado." },
          { status: 404 }
        );
      }
  
      // Exclui os itens do pedido primeiro
      await prisma.orderItem.deleteMany({
        where: { orderId: id },
      });
  
      // Exclui o pedido
      await prisma.order.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: "Pedido removido com sucesso!" });
    } catch (error) {
      console.error("Erro ao remover pedido:", error);
      return NextResponse.json(
        { error: "Erro ao remover o pedido." },
        { status: 500 }
      );
    }
  }
  

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.order.update({
      where: { id },
      data: { status: "approved" },
    });

    return NextResponse.json({ message: "Pedido aprovado!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao aprovar pedido." },
      { status: 500 }
    );
  }
}
