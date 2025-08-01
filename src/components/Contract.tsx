import React from 'react';
import { FileText, Mail } from 'lucide-react';

export const Contract: React.FC = () => {
  return (
    <div className="py-16 bg-white border-t">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-gray-600" />
            <h2 className="text-3xl font-bold text-gray-900">Договор оферты</h2>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg leading-relaxed mb-6">
              Используя данный сайт и сервис международных денежных переводов, вы соглашаетесь 
              с условиями предоставления услуг. Все переводы осуществляются в рамках действующего 
              законодательства Российской Федерации и международных соглашений.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Основные условия:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Комиссия за перевод составляет от 1% до 3%</li>
                  <li>• Минимальная сумма перевода: 1 000 ₽</li>
                  <li>• Максимальная сумма перевода: 600 000 ₽</li>
                  <li>• Срок зачисления: 1-3 рабочих дня</li>
                  <li>• Поддержка клиентов 24/7</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Безопасность:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Все данные защищены SSL-шифрованием</li>
                  <li>• Соответствие требованиям ПОД/ФТ</li>
                  <li>• Лицензия ЦБ РФ на валютные операции</li>
                  <li>• Страхование операций до 1 млн ₽</li>
                  <li>• Конфиденциальность данных клиентов</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900 mb-2">
                    Нужна помощь или полный текст договора?
                  </p>
                  <p className="text-sm text-gray-600">
                    Свяжитесь с нами: 
                    <a href="mailto:support@moneytransfer.ru" className="text-blue-600 hover:underline ml-1">
                      support@moneytransfer.ru
                    </a>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Телефон поддержки: 
                    <a href="tel:+78001234567" className="text-blue-600 hover:underline ml-1">
                      +7 (800) 123-45-67
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 MoneyTransfer. Все права защищены.</p>
          <p className="mt-1">
            Лицензия ЦБ РФ № 1234-56789 от 01.01.2024
          </p>
        </div>
      </div>
    </div>
  );
};