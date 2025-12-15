import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  const features = [
    "Unlimited Chat History",
    "4K Image Generation",
    "Priority Response Time",
    "Voice Mode Access",
    "Custom Personas"
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to Aura Pro">
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30">
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-white">$9.99</span>
            <span className="text-slate-400">/month</span>
          </div>
          <ul className="space-y-3">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-center text-slate-200">
                <i className="fa-solid fa-check-circle text-green-400 mr-3"></i>
                {feat}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-4">
            Cancel anytime. Secure payment via Stripe.
          </p>
          <Button variant="gradient" className="w-full" onClick={onClose}>
            Start Free Trial
          </Button>
        </div>
      </div>
    </Modal>
  );
};