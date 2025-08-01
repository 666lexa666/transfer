import React from 'react';
import { Send, Shield, Clock, Globe } from 'lucide-react';

interface HeroProps {
  onOpenTransfer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTransfer }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Международные переводы —
            <span className="block text-blue-200">быстро, просто, надёжно</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Отправьте деньги за границу за пару минут. 
            Выгодные курсы, низкие комиссии, поддержка 24/7
          </p>

          <button
            onClick={onOpenTransfer}
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Send size={24} />
            Сделать перевод
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Безопасно</h3>
              <p className="text-blue-200">Все переводы защищены банковским шифрованием</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 поддержка</h3>
              <p className="text-blue-200">Помощь специалистов в любое время</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Работаем с банками мира</h3>
              <p className="text-blue-200">Переводы в более чем 50 стран</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};