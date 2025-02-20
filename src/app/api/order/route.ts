// /pages/api/orders.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

// Rota para criar um pedido
export async function POST(req: NextRequest) {
  try {
    const { name, phone, items, total, observation } = await req.json();

    // Verifica se o usuário já existe pelo telefone
    let user = await prismaClient.user.findUnique({
      where: { phone },
    });

    // Se não existir, cria um novo usuário
    if (!user) {
      user = await prismaClient.user.create({
        data: { name, phone },
      });
    }

    // Cria o pedido
    const order = await prismaClient.order.create({
      data: {
        userId: user.id,
        total,
        observation,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar pedido" },
      { status: 500 }
    );
  }
}

// Rota para buscar os pedidos
export async function GET(req: NextRequest) {
  try {
    const orders = await prismaClient.order.findMany({
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar pedidos." }, { status: 500 });
  }
}
