import styled from '@emotion/styled/macro';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const OverlayModal = styled.div`
  position: relative;
  max-width: calc(100vw - 500px);
  max-height: calc(100vh - 24px);
`;

export const ModalButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  top: 20px;
  border: none;
  outline: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(0, 0, 0, 0.2);
  &:hover {
    color: rgba(0, 0, 0, 0.7);
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
