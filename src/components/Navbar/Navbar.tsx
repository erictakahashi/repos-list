import { FC } from 'react';

import Styled from './Navbar.styled';

const Navbar: FC = () => (
  <Styled.Wrapper>
    <Styled.Container>
      <Styled.Title>Repos List</Styled.Title>
    </Styled.Container>
  </Styled.Wrapper>
);

export default Navbar;
