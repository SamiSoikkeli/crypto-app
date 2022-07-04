import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from "styled-components"
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';

const AppWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
