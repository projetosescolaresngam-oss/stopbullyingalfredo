import React from 'react';
import { CentralRespeitoHub } from './centralRespeito/CentralRespeitoHub';

interface QuizEducativoProps {
  onBack: () => void;
}

export const QuizEducativo: React.FC<QuizEducativoProps> = ({ onBack }) => {
  return <CentralRespeitoHub onBack={onBack} />;
};
