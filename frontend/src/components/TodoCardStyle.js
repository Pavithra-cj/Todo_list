import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Card = styled.div`
  border: 1px solid #8758ff;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const H2 = styled.h2`
  color: #ffffff;
`;

export const P = styled.p`
  color: #666;
`;

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleSwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const ToggleSwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    content: '';
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + &:before {
    transform: translateX(26px);
  }
`;

export const EditIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export const DeleteIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
