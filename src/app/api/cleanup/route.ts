import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const expiredOrders = await prisma.order.findMany({
      where: {
        expiresAt: { lte: now },
        proofUrl: { not: null },
      },
    });

    if (expiredOrders.length > 0) {
      await prisma.order.updateMany({
        where: { id: { in: expiredOrders.map((order) => order.id) } },
        data: { proofUrl: null, expiresAt: null },
      });

      return NextResponse.json({
        message: `🗑️ ${expiredOrders.length} comprovante(s) expirado(s) removidos.`,
      });
    }

    return NextResponse.json({
      message: "✅ Nenhum comprovante expirado encontrado.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao excluir comprovantes expirados." },
      { status: 500 }
    );
  }
}
