import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="py-16 bg-white border-t">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-50 rounded-xl p-8">
          <div className="prose max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Реквизиты компании</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
                <ul className="space-y-2 text-sm">
                  <li>• ООО "Максым"</li>
                  <li>• Страна регистрации: Киргизская Республика</li>
                  <li>• ИНН 9900738874</li>
                  <li>• КПП 773687001</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Юридический адрес</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 720042, Киргизская Республика</li>
                  <li>• г. Бишкек, Первомайский район</li>
                  <li>• ул. Тоголок Молдо, 236</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
              <div>
                <p className="font-medium text-gray-900 mb-2">
                  Юридические документы
                </p>
                <p className="text-sm text-gray-600">
                  Все операции осуществляются в соответствии с законодательством Киргизской Республики
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ООО "Максым". Все права защищены.</p>
        </div>
      </div>
    </div>
  );
};