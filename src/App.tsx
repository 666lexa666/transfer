import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { CurrencyRates } from './components/CurrencyRates';
import { TransferModal } from './components/TransferModal';
import { PaymentModal } from './components/PaymentModal';
import { TransferForm } from './types';
import { Footer } from './components/Footer';

function App() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [transferData, setTransferData] = useState<TransferForm | null>(null);

  const handleOpenTransfer = () => {
    setShowTransferModal(true);
  };

  const handleTransferNext = (data: TransferForm) => {
    setTransferData(data);
    setShowTransferModal(false);
    setShowPaymentModal(true);
  };

  const handleCloseModals = () => {
    setShowTransferModal(false);
    setShowPaymentModal(false);
    setTransferData(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow">
        <Hero onOpenTransfer={handleOpenTransfer} />
        <CurrencyRates />

        <TransferModal
          isOpen={showTransferModal}
          onClose={handleCloseModals}
          onNext={handleTransferNext}
        />

        <PaymentModal
          isOpen={showPaymentModal}
          onClose={handleCloseModals}
          transferData={transferData}
        />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;