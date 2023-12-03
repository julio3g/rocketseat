import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  form {
    gap: 3.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

export const BaseCountdownButton = styled.button`
  border: 0;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  display: flex;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${(props) => props.theme['green-700']};
  }
`
export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${(props) => props.theme['red-500']};
  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
  }
`
