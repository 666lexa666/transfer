import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { CurrencyRate } from '../types';

export const CurrencyRates: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchRates = async () => {
    setLoading(true);
    try {
      // В реальном проекте здесь должен быть запрос к API курсов валют
      // Для демонстрации используем статические данные с небольшой рандомизацией
      const mockRates: CurrencyRate[] = [
        { code: 'EUR', flag: '🇪🇺', rate: 105.50 + Math.random() * 2, name: 'Евро' },
        { code: 'USD', flag: '🇺🇸', rate: 98.20 + Math.random() * 2, name: 'Доллар США' },
        { code: 'KZT', flag: '🇰🇿', rate: 0.21 + Math.random() * 0.02, name: 'Тенге' },
        { code: 'BYN', flag: '🇧🇾', rate: 31.80 + Math.random() * 1, name: 'Белорусский рубль' },
      ];
      
      setRates(mockRates);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // Обновляем курсы каждые 5 минут
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Актуальные курсы валют</h2>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span>Обновлено: {lastUpdated.toLocaleTimeString('ru-RU')}</span>
            <button
              onClick={fetchRates}
              disabled={loading}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rates.map((rate) => (
            <div key={rate.code} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{rate.flag}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{rate.code}</h3>
                    <p className="text-sm text-gray-600">{rate.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {rate.rate.toFixed(2)} ₽
                </div>
                <div className="text-sm text-gray-600">
                  за 1 {rate.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};