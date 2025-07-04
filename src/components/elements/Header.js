import styled from 'styled-components';

// Header container met padding en flex layout, ruimte tussen items
const Header = styled.div`
  width: 100%;
  padding: 2.5rem; /* 40px */
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 60rem){ /* 950px */
      justify-content: start; /* kleiner scherm, items links uitlijnen */
  }
`;

// Titel styling, uppercase en grote font size, kleiner op mobiel
const Title = styled.h1`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 2.5rem; /* 40px */

  @media(max-width: 60rem){ /* 950px */
      font-size: 2rem; /* 32px */
  }
`;

// Container voor header elementen met flex layout
// Op kleinere schermen kolom-layout en items gecentreerd, plus extra styling voor nested div
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media(max-width: 60rem){ /* 950px */
      display: flex;
      flex-direction: column-reverse; /* items onder elkaar en omgekeerde volgorde */
      align-items: center;

      & > div {
        display: flex;
        margin-bottom: 1.25rem; /* 20px */
        justify-content: flex-end; /* inhoud rechts uitlijnen */
      }
  }
`;

// Container voor knoppen met ruimte ertussen en verticaal gecentreerd
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { Header, Title, HeaderContainer, ButtonsContainer };