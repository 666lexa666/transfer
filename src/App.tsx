import React, { useState, useEffect } from 'react';
import { Gamepad2, Shield, Clock, Phone, Mail, X, Check } from 'lucide-react';

interface FormData {
  fullName: string;
  phone: string;
  telegram: string;
  platform: 'steam' | 'pubg';
  steamId: string;
  pubgUid: string;
  amount: number;
}

const TELEGRAM_BOT_TOKEN = '8241509306:AAGLQ2FhiK52e44kz2OAXyT7LVfJq5x0QkY';
const TELEGRAM_CHAT_ID = '8177412456';

function App() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentDoc, setCurrentDoc] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    telegram: '',
    platform: 'steam',
    steamId: '',
    pubgUid: '',
    amount: 0
  });

  const calculateTotal = (amount: number, platform: 'steam' | 'pubg') => {
    const commission = platform === 'steam' ? 0.10 : 0.08;
    return Math.ceil(amount * (1 + commission));
  };

  const sendToTelegram = async () => {
    const total = calculateTotal(formData.amount, formData.platform);
    const message = `
🆕 Новая заявка на пополнение

👤 ФИО: ${formData.fullName}
📱 Телефон: ${formData.phone}
📞 Telegram: @${formData.telegram}
🎮 Платформа: ${formData.platform === 'steam' ? 'Steam' : 'PUBG Mobile'}
${formData.platform === 'steam' ? `🆔 Steam ID: ${formData.steamId}` : `🆔 PUBG UID: ${formData.pubgUid}`}
💰 Сумма пополнения: ${formData.amount} руб.
💳 К оплате: ${total} руб.
    `;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      });
      setShowOrderModal(false);
      setShowPaymentModal(true);
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('Ошибка отправки заявки. Попробуйте позже.');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendToTelegram();
  };
  const openDocModal = (docType: string) => {
    setCurrentDoc(docType);
    setShowDocModal(true);
  };
  useEffect(() => {
    if (showOrderModal || showDocModal || showPaymentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOrderModal, showDocModal, showPaymentModal]);

  const reviews = [
    {
      name: "Алексей К.",
      text: "Быстро пополнил Steam, без проблем. Комиссия минимальная, рекомендую!",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Мария В.",
      text: "Пополняла PUBG Mobile, всё прошло моментально. Очень удобно!",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Дмитрий С.",
      text: "Пользуюсь регулярно, никогда не подводили. Отличный сервис!",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Анна Л.",
      text: "Самые низкие комиссии из всех, что видела. Спасибо за качественный сервис!",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  const documents = {
    offer: `
      <h2>Оферта</h2>
      <p>Настоящая оферта определяет условия предоставления услуг по пополнению игровых аккаунтов...</p>
      <h3>1. Предмет договора</h3>
      <p>Исполнитель обязуется оказать услуги по пополнению баланса игровых аккаунтов Steam и PUBG Mobile...</p>
      <h3>2. Стоимость услуг</h3>
      <p>Комиссия составляет 10% для Steam и 8% для PUBG Mobile от суммы пополнения...</p>
    `,
    privacy: `
      <h2>Политика конфиденциальности</h2>
      <p>Настоящая политика определяет порядок обработки персональных данных...</p>
      <h3>1. Сбор информации</h3>
      <p>Мы собираем только необходимую для оказания услуг информацию...</p>
      <h3>2. Использование данных</h3>
      <p>Ваши данные используются исключительно для выполнения заказов...</p>
    `,
    consent: `
      <h2>Согласие на обработку персональных данных</h2>
      <p>Даю согласие на обработку моих персональных данных в целях оказания услуг...</p>
      <h3>1. Цели обработки</h3>
      <p>Обработка данных осуществляется для выполнения договорных обязательств...</p>
    `,
    refusal: `
      <h2>Отказ от услуги</h2>
      <p>Порядок отказа от оказания услуг...</p>
      <h3>1. Условия отказа</h3>
      <p>Отказ возможен до момента выполнения операции пополнения...</p>
    `
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="w-8 h-8 text-blue-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
                GameRefill Pro
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
            Быстрое и безопасное пополнение баланса Steam и PUBG Mobile
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Мгновенная обработка, минимальная комиссия, удобная оплата.<br />
            Работает 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Безопасно</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500" />
              <span>Мгновенно</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
              <Check className="w-5 h-5 text-yellow-500" />
              <span>Низкая комиссия</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Тарифы</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-gray-800/30 p-8 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Steam</h3>
              <p className="text-gray-300 mb-6">Пополнение баланса Steam Wallet</p>
              <div className="text-3xl font-bold mb-2">+10%</div>
              <p className="text-gray-400">комиссии</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/30 to-gray-800/30 p-8 rounded-2xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">PUBG Mobile</h3>
              <p className="text-gray-300 mb-6">Пополнение UC в PUBG Mobile</p>
              <div className="text-3xl font-bold mb-2">+8%</div>
              <p className="text-gray-400">комиссии</p>
            </div>
          </div>
        </div>
      </section>

      {/* Agreement */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-start space-x-3 bg-gray-800/30 p-6 rounded-lg">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="agreement" className="text-gray-300 cursor-pointer">
              Я принимаю <button onClick={() => openDocModal('offer')} className="text-blue-400 hover:text-blue-300 underline">оферту</button>, <button onClick={() => openDocModal('privacy')} className="text-blue-400 hover:text-blue-300 underline">политику конфиденциальности</button> и даю <button onClick={() => openDocModal('consent')} className="text-blue-400 hover:text-blue-300 underline">согласие на обработку персональных данных</button>.
            </label>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => setShowOrderModal(true)}
              disabled={!isAgreed}
              className={`px-12 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ${
                isAgreed
                  ? 'bg-gradient-to-r from-blue-600 to-yellow-600 hover:from-blue-500 hover:to-yellow-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              Пополнить
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
                  <h4 className="font-semibold">{review.name}</h4>
                </div>
                <p className="text-gray-300 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Документы</h3>
              <ul className="space-y-2">
                <li><button onClick={() => openDocModal('offer')} className="text-gray-300 hover:text-blue-400 transition-colors">Оферта</button></li>
                <li><button onClick={() => openDocModal('privacy')} className="text-gray-300 hover:text-blue-400 transition-colors">Политика конфиденциальности</button></li>
                <li><button onClick={() => openDocModal('consent')} className="text-gray-300 hover:text-blue-400 transition-colors">Согласие на обработку данных</button></li>
                <li><button onClick={() => openDocModal('refusal')} className="text-gray-300 hover:text-blue-400 transition-colors">Отказ от услуги</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Контакты</h3>
              <ul className="space-y-2">
                <li>
                  <a href="tel:+79001234567" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>+7 (900) 123-45-67</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:support@gamerefill.ru" className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>support@gamerefill.ru</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>ООО "Максым" — Все права защищены</p>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Оформление заказа</h3>
                <button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ФИО</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Номер телефона</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telegram ник</label>
                  <input
                    type="text"
                    required
                    value={formData.telegram}
                    onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="без @"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Платформа</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value as 'steam' | 'pubg'})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="steam">Steam</option>
                    <option value="pubg">PUBG Mobile</option>
                  </select>
                </div>
                {formData.platform === 'steam' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">ID Steam</label>
                    <input
                      type="text"
                      required
                      value={formData.steamId}
                      onChange={(e) => setFormData({...formData, steamId: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">UID PUBG</label>
                    <input
                      type="text"
                      required
                      value={formData.pubgUid}
                      onChange={(e) => setFormData({...formData, pubgUid: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Сумма пополнения</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                {formData.amount > 0 && (
                  <div className="bg-blue-900/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>К оплате:</span>
                      <span className="text-yellow-400">{calculateTotal(formData.amount, formData.platform)} руб.</span>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-yellow-600 hover:from-blue-500 hover:to-yellow-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Оплатить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Document Modal */}
      {showDocModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setShowDocModal(false)} className="text-gray-400 hover:text-white ml-auto">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: documents[currentDoc as keyof typeof documents] }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full">
            <div className="p-6 text-center">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Оплата</h3>
                <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="bg-white p-4 rounded-lg mb-4">
                <img 
                  src="https://images.pexels.com/photos/8358144/pexels-photo-8358144.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="QR код для оплаты" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
              <p className="text-gray-300 mb-4">Сканируйте QR-код для оплаты</p>
              <p className="text-sm text-gray-400">
                Заявка отправлена. После оплаты с вами свяжется оператор.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;