export const sendToTelegram = async (data: any) => {
  const BOT_TOKEN = '8241509306:AAGLQ2FhiK52e44kz2OAXyT7LVfJq5x0QkY'; // В продакшене это должно быть в переменных окружения
  const CHAT_ID = '8177412456';
  
  const message = `
🆕 Новая заявка:
👤 ОТПРАВИТЕЛЬ:
📝 ФИО: ${data.senderName}
📞 Телефон: ${data.senderPhone}
📧 Email: ${data.senderEmail}

👥 ПОЛУЧАТЕЛЬ:
🌍 Страна: ${data.country}
📝 ФИО: ${data.recipientName}
🏦 Банк: ${data.bank}
💳 Счёт: ${data.account}

💰 ПЕРЕВОД:
💱 Валюта: ${data.currency}
💵 Сумма: ${data.amount.toLocaleString('ru-RU')} ₽

📅 Время: ${new Date().toLocaleString('ru-RU')}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send telegram message');
    }

    return await response.json();
  } catch (error) {
    console.error('Telegram send error:', error);
    // В продакшене здесь должна быть обработка ошибок
    return { success: false, error };
  }
};