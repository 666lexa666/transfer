import React, { useState, useEffect } from 'react';
import { X, QrCode, CheckCircle, CreditCard } from 'lucide-react';
import { TransferForm } from '../types';
import { generateQRCode } from '../utils/qr';
import { sendToTelegram } from '../utils/telegram';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  transferData: TransferForm | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  transferData,
}) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [showQR, setShowQR] = useState(false);
  const [amountError, setAmountError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      // Сбрасываем состояние при открытии модального окна
      setAmount(0);
      setShowQR(false);
      setIsSubmitted(false);
      setQrCode('');
      setAmountError('');
    }
  }, [isOpen]);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      setAmountError('Введите сумму больше 0');
      return;
    }

    if (!transferData) return;

    // Создаем обновленные данные с суммой
    const updatedTransferData = { ...transferData, amount };

    // Генерируем QR-код
    const qr = generateQRCode(amount, transferData.recipientName);
    setQrCode(qr);
    setShowQR(true);
    
    setIsSubmitting(true);
    try {
      await sendToTelegram(updatedTransferData);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send to Telegram:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setQrCode('');
    setShowQR(false);
    setAmount(0);
    setAmountError('');
    onClose();
  };

  if (!isOpen || !transferData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Оплата перевода</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Получатель:</strong> {transferData.recipientName}</p>
              <p><strong>Страна:</strong> {transferData.country}</p>
              <p><strong>Валюта:</strong> {transferData.currency}</p>
            </div>
          </div>

          {!showQR && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сумма для отправки (в рублях) *
              </label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount || ''}
                onChange={(e) => {
                  setAmount(parseFloat(e.target.value) || 0);
                  if (amountError) setAmountError('');
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  amountError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="10000"
              />
              {amountError && <p className="mt-1 text-sm text-red-600">{amountError}</p>}
              
              <button
                onClick={handlePayment}
                className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
              >
                <CreditCard size={20} />
                Оплатить {amount > 0 ? `${amount.toLocaleString('ru-RU')} ₽` : ''}
              </button>
            </div>
          )}

          {showQR && qrCode && (
            <div className="mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  К оплате: {amount.toLocaleString('ru-RU')} ₽
                </h3>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <QrCode className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">QR-код для оплаты</span>
              </div>
              
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4 inline-block">
                <img
                  src={qrCode}
                  alt="QR код для оплаты"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                Отсканируйте QR-код в приложении вашего банка
              </p>
            </div>
          )}

          {isSubmitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <CheckCircle size={20} />
                <span className="font-medium">Заявка отправлена!</span>
              </div>
              <p className="text-sm text-green-600 mt-2">
                Ваша заявка передана администратору. Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          )}

          {isSubmitting && (
            <div className="text-blue-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm">Отправляем заявку...</p>
            </div>
          )}

          {showQR && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
              <p className="font-medium mb-1">Важно:</p>
              <p>После оплаты сохраните чек. Средства будут переведены получателю в течение 1-3 рабочих дней.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};