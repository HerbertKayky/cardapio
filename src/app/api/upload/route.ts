import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const writeFile = promisify(fs.writeFile);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const orderId = formData.get("orderId");

    if (!(file instanceof File) || !orderId) {
      return NextResponse.json(
        { error: "Arquivo ou ID do pedido ausente." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Criar diretório se não existir
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await prisma.order.update({
      where: { id: orderId.toString() },
      data: {
        proofUrl: `/uploads/${file.name}`,
        expiresAt,
      },
    });

    return NextResponse.json({
      message: "Comprovante enviado com sucesso!",
      url: `/uploads/${file.name}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao processar o upload." },
      { status: 500 }
    );
  }
}
