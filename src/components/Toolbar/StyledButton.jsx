import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonWrapper = styled(motion.button)`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;

  ${props => props.$variant === 'primary' && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  `}

  ${props => props.$variant === 'secondary' && `
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
  `}

  ${props => props.$variant === 'success' && `
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(79, 172, 254, 0.4);
  `}

  ${props => props.$variant === 'outline' && `
    background: transparent;
    color: #667eea;
    border: 2px solid #667eea;
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const StyledButton = ({ children, variant = 'primary', onClick, disabled, icon, ...props }) => {
  return (
    <ButtonWrapper
      $variant={variant}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </ButtonWrapper>
  );
};

export default StyledButton;
