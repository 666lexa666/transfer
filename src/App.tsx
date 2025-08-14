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
      avatar: "https://pin.it/3ahDLihgt"
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
<p>Настоящая оферта определяет условия предоставления услуг онлайн-сервиса, размещённого по адресу: <a href="https://transfer-lilac.vercel.app/">https://transfer-lilac.vercel.app/</a>. Акцепт оферты Пользователем означает полное согласие с условиями настоящего договора.</p>

<p>Дата публикации: 14.08.2025</p>
<p>Редакция от: 14.08.2025</p>

<h3>1. Предмет договора</h3>
<p>Исполнитель, ООО "Максым", обязуется предоставить Пользователю доступ к услугам Сайта, а Пользователь обязуется оплачивать их в соответствии с условиями настоящей оферты.</p>
<h3>2. Стоимость услуг и порядок оплаты</h3>
<p>Стоимость услуг определяется на основании тарифов, размещённых на Сайте. Оплата производится Пользователем удобным способом, указанным на Сайте.</p>

<h3>3. Права и обязанности сторон</h3>
<p><strong>Исполнитель обязуется:</strong></p>
<ul>
  <li>Предоставлять доступ к услугам в соответствии с условиями оферты;</li>
  <li>Обеспечивать стабильную работу Сайта, за исключением периодов технического обслуживания;</li>
  <li>Предоставлять информацию о Сайте и услугах.</li>
</ul>
<p><strong>Пользователь обязуется:</strong></p>
<ul>
  <li>Своевременно оплачивать услуги;</li>
  <li>Соблюдать правила использования Сайта;</li>
  <li>Не предпринимать действий, нарушающих работу Сайта.</li>
</ul>

<h3>4. Ответственность сторон</h3>
<p>Исполнитель не несет ответственность за нарушения, вызванные третьими лицами, и за недоступность Сайта по причинам, не зависящим от Исполнителя. Пользователь несёт ответственность за достоверность предоставленных данных и соблюдение условий оферты.</p>

<h3>5. Изменение и расторжение договора</h3>
<p>Исполнитель вправе изменять условия оферты, публикуя новую редакцию на Сайте. Пользователь может отказаться от использования услуг, уведомив об этом Исполнителя.</p>

<h3>6. Заключительные положения</h3>
<p>Оферта вступает в силу с момента публикации на Сайте и действует до её отзыва. Все споры разрешаются в соответствии с законодательством Кыргызской Республики.</p>

<h3>Реквизиты Исполнителя</h3>
<p>ООО "Максым"<br>
ИНН 9909738874<br>
КПП 773687001<br>
Юридический адрес: 720042, Киргизская Республика, город Бишкек, Первомайский район, ул. Тоголок Молдо, 236<br>
Тел.: +7 916 699-27-44<br>
E-mail: abrornegmat@icloud.com</p>

    `,
    privacy: `
      <h2>Политика конфиденциальности</h2>
<p>Настоящая Политика конфиденциальности определяет правила сбора, использования, хранения и защиты персональных данных пользователей сайта <a href="https://transfer-lilac.vercel.app/">https://transfer-lilac.vercel.app/</a> (далее — «Сайт»).</p>
<p>Дата публикации: 14.08.2025</p>
<p>Редакция от: 14.08.2025</p>
<h3>1. Общие положения</h3>
<p>Исполнитель, ООО "Максым", обязуется защищать персональные данные Пользователей и соблюдать требования законодательства Кыргызской Республики в области обработки и защиты персональной информации.</p>

<h3>2. Персональные данные</h3>
<p>Под персональными данными понимается любая информация, позволяющая идентифицировать Пользователя, включая, но не ограничиваясь: ФИО, адрес электронной почты, телефон, платежные данные.</p>

<h3>3. Цели сбора персональных данных</h3>
<ul>
  <li>Предоставление услуг Сайта и обработка платежей;</li>
  <li>Обеспечение связи с Пользователем (уведомления, поддержка);</li>
  <li>Анализ и улучшение качества услуг;</li>
  <li>Соблюдение требований законодательства.</li>
</ul>

<h3>4. Способы сбора информации</h3>
<p>Персональные данные собираются при регистрации на Сайте, оформлении заказов, обращении в службу поддержки и использовании других сервисов Сайта.</p>

<h3>5. Использование и обработка данных</h3>
<p>Собранные данные используются исключительно для целей, указанных в разделе 3. Исполнитель не передаёт персональные данные третьим лицам без согласия Пользователя, за исключением случаев, предусмотренных законодательством.</p>

<h3>6. Защита данных</h3>
<p>Исполнитель принимает организационные, технические и правовые меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>

<h3>7. Права Пользователя</h3>
<ul>
  <li>Получать информацию о своих персональных данных, которые обрабатываются на Сайте;</li>
  <li>Требовать уточнения, блокировки или удаления своих персональных данных;</li>
  <li>Отозвать согласие на обработку персональных данных в любое время.</li>
</ul>

<h3>8. Изменение политики</h3>
<p>Исполнитель вправе вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда размещается на Сайте.</p>

<h3>Реквизиты Исполнителя</h3>
<p>ООО "Максым"<br>
ИНН 9909738874<br>
КПП 773687001<br>
Юридический адрес: 720042, Киргизская Республика, город Бишкек, Первомайский район, ул. Тоголок Молдо, 236<br>
Тел.: +7 916 699-27-44<br>
E-mail: abrornegmat@icloud.com<br>
`,
    consent: `
      <h2>Согласие на обработку персональных данных</h2>
<p>Настоящим я, Пользователь сайта <a href="https://transfer-lilac.vercel.app/">https://transfer-lilac.vercel.app/</a>, выражаю своё согласие на обработку моих персональных данных ООО "Максым" (ИНН 9909738874, КПП 773687001) в соответствии с законодательством Кыргызской Республики.</p>
<p>Дата публикации: 14.08.2025</p>
<p>Редакция от: 14.08.2025</p>
<h3>1. Цели обработки персональных данных</h3>
<ul>
  <li>Предоставление услуг Сайта и обработка платежей;</li>
  <li>Осуществление связи с Пользователем (уведомления, консультации, поддержка);</li>
  <li>Анализ и улучшение качества услуг;</li>
  <li>Выполнение требований законодательства.</li>
</ul>

<h3>2. Обрабатываемые данные</h3>
<p>Согласие распространяется на следующие персональные данные: ФИО, контактные данные (телефон, e-mail), платежная информация и иные данные, предоставленные Пользователем при регистрации или использовании Сайта.</p>

<h3>3. Права Пользователя</h3>
<ul>
  <li>Получать информацию о своих персональных данных, которые обрабатываются на Сайте;</li>
  <li>Требовать уточнения, блокировки или удаления своих персональных данных;</li>
  <li>Отозвать своё согласие на обработку данных в любое время, направив письменное уведомление Исполнителю.</li>
</ul>

<h3>4. Срок действия согласия</h3>
<p>Согласие действует до момента его отзыва Пользователем в порядке, установленном настоящей политикой.</p>

<h3>Реквизиты Исполнителя</h3>
<p>ООО "Максым"<br>
ИНН 9909738874, КПП 773687001<br>
Юридический адрес: 720042, Киргизская Республика, город Бишкек, Первомайский район, ул. Тоголок Молдо, 236<br>
Тел.: +7 916 699-27-44<br>
E-mail: abrornegmat@icloud.com<br>
    `,
    refusal: `
    
      <h2>Отказ от услуги</h2>
<p>В соответствии с законодательством Кыргызской Республики, клиент имеет право отказаться от платной услуги в любое время до её фактического оказания.</p>
<p>Дата публикации: 14.08.2025</p>
<p>Редакция от: 14.08.2025</p>
<h3>Для оформления возврата необходимо:</h3>
<ol>
  <li>Написать заявление в свободной форме с указанием ФИО, даты заказа и способа оплаты.</li>
  <li>Отправить его на электронную почту: <a href="mailto:abrornegmat@icloud.com">abrornegmat@icloud.com</a></li>
  <li>В случае, если услуга ещё не была оказана, денежные средства возвращаются в течение 10 рабочих дней.</li>
</ol>

<h3>Важные условия:</h3>
<ul>
  <li>Возврат невозможен, если услуга уже была полностью оказана.</li>
  <li>При частичном оказании услуги возврат возможен пропорционально невыполненной части.</li>
</ul>

<h3>Контакты для обращений</h3>
<p>По всем вопросам обращайтесь на e-mail: <a href="mailto:abrornegmat@icloud.com">abrornegmat@icloud.com</a></p>

<h3>Реквизиты Исполнителя</h3>
<p>ООО "Максым"<br>
ИНН 9909738874, КПП 773687001<br>
Юридический адрес: 720042, Киргизская Республика, город Бишкек, Первомайский район, ул. Тоголок Молдо, 236<br>
Тел.: +7 916 699-27-44<br>
E-mail: abrornegmat@icloud.com<br>

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