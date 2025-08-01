import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { TransferForm } from '../types';
import { countries, currencies } from '../data/countries';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (data: TransferForm) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  onNext,
}) => {
  const [formData, setFormData] = useState<TransferForm>({
    country: '',
    recipientName: '',
    bank: '',
    account: '',
    currency: '',
    amount: 0,
  });

  const [errors, setErrors] = useState<Partial<TransferForm>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<TransferForm> = {};
    
    if (!formData.country) newErrors.country = 'Выберите страну';
    if (!formData.recipientName) newErrors.recipientName = 'Введите ФИО получателя';
    if (!formData.bank) newErrors.bank = 'Введите название банка';
    if (!formData.account) newErrors.account = 'Введите номер счёта';
    if (!formData.currency) newErrors.currency = 'Выберите валюту';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Устанавливаем amount в 0, так как он будет указан в окне оплаты
    formData.amount = 0;
    onNext(formData);
  };

  const handleChange = (field: keyof TransferForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Данные для перевода</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Страна получателя *
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Выберите страну</option>
              {countries.map((country) => (
                <option key={country.code} value={`${country.flag} ${country.name}`}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
            {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ФИО получателя *
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) => handleChange('recipientName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.recipientName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Иванов Иван Иванович"
            />
            {errors.recipientName && <p className="mt-1 text-sm text-red-600">{errors.recipientName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Банк получателя *
            </label>
            <input
              type="text"
              value={formData.bank}
              onChange={(e) => handleChange('bank', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.bank ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Deutsche Bank, Sberbank Europe, и т.д."
            />
            {errors.bank && <p className="mt-1 text-sm text-red-600">{errors.bank}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Счёт получателя *
            </label>
            <input
              type="text"
              value={formData.account}
              onChange={(e) => handleChange('account', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.account ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="DE12345678901234567890 или аналогичный"
            />
            {errors.account && <p className="mt-1 text-sm text-red-600">{errors.account}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Валюта получения *
            </label>
            <select
              value={formData.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.currency ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Выберите валюту</option>
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.flag} {currency.name} ({currency.code})
                </option>
              ))}
            </select>
            {errors.currency && <p className="mt-1 text-sm text-red-600">{errors.currency}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            Перейти к оплате
            <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};