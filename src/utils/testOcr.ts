import { verifyPaymentReceipt } from "./ocr";

const imagePath = "public/uploads/tt.png"; // Substitua pelo caminho real da imagem
const expectedAmount = 25.50; // Ajuste para o valor do pedido

verifyPaymentReceipt(imagePath, expectedAmount).then((isValid) => {
  console.log("Pagamento válido?", isValid);
});
