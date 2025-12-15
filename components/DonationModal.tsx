import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Support Aura.algo">
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-heart text-2xl text-pink-500"></i>
        </div>
        <p className="text-slate-300">
          Aura is an independent project. Your support helps keep the servers running and the models intelligent!
        </p>
        
        <div className="grid grid-cols-3 gap-3">
          <button className="p-3 rounded-lg border border-slate-600 hover:border-pink-500 hover:bg-pink-500/10 transition-all text-white">
            $5
          </button>
          <button className="p-3 rounded-lg border border-pink-500 bg-pink-500/10 text-white">
            $10
          </button>
          <button className="p-3 rounded-lg border border-slate-600 hover:border-pink-500 hover:bg-pink-500/10 transition-all text-white">
            $25
          </button>
        </div>

        <Button variant="gradient" className="w-full mt-4" onClick={onClose}>
          Donate via PayPal
        </Button>
      </div>
    </Modal>
  );
};