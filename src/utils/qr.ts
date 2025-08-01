export const generateQRCode = (amount: number, recipient: string) => {
  // В реальном проекте здесь должна быть интеграция с реальным банковским API
  // Для демонстрации используем QR.io API
  const paymentData = `Перевод ${amount}₽ для ${recipient}`;
  const encodedData = encodeURIComponent(paymentData);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}`;
};