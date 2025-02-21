import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function deleteExpiredProofs() {
  const now = new Date();

  try {
    // Buscar e remover pedidos com comprovantes expirados
    const expiredOrders = await prisma.order.findMany({
      where: {
        expiresAt: { lte: now },
        proofUrl: { not: null }, // Apenas pedidos que têm comprovante
      },
    });

    if (expiredOrders.length > 0) {
      await prisma.order.updateMany({
        where: { id: { in: expiredOrders.map((order) => order.id) } },
        data: { proofUrl: null, expiresAt: null }, // Remove o comprovante
      });

      console.log(
        `🗑️ ${expiredOrders.length} comprovante(s) expirado(s) foram removidos.`
      );
    } else {
      console.log("✅ Nenhum comprovante expirado encontrado.");
    }
  } catch (error) {
    console.error("Erro ao excluir comprovantes expirados:", error);
  }
}

// Executa a limpeza
deleteExpiredProofs();
