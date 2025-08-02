import React from 'react';
import { useState } from 'react';
import { FileText, Mail, Phone } from 'lucide-react';
import { DocumentModal } from './DocumentModal';
import { documents } from '../data/documents';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (documentKey: string) => {
    setActiveModal(documentKey);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className="py-16 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Документы */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-900">Документы</h2>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => openModal('contract')}
                  className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors text-left"
                >
                  Договор оферты
                </button>
                <button
                  onClick={() => openModal('privacy')}
                  className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors text-left"
                >
                  Политика конфиденциальности
                </button>
                <button
                  onClick={() => openModal('consent')}
                  className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors text-left"
                >
                  Согласие на обработку данных
                </button>
                <button
                  onClick={() => openModal('refusal')}
                  className="block text-blue-600 hover:text-blue-800 hover:underline transition-colors text-left"
                >
                  Отказ от услуги
                </button>
              </div>
            </div>

            {/* Контакты */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Контакты</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <a 
                    href="mailto:abrornegmat@icloud.com"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    abrornegmat@icloud.com
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <a 
                    href="tel:+79166992744"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    +7 (916) 699-27-44
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-8 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} ООО "Максым". Все права защищены.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Модальные окна для документов */}
      {activeModal && (
        <DocumentModal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={documents[activeModal as keyof typeof documents].title}
          content={documents[activeModal as keyof typeof documents].content}
          fileName={documents[activeModal as keyof typeof documents].fileName}
        />
      )}
    </>
  );
};