import styled from 'styled-components';

import mixins from '../../styles/mixins';

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #009be5;
`;

const Container = styled.div`
  ${mixins.container}
`;

const Title = styled.h1`
  margin: 0;
  color: #ffffff;
`;

const Styled = {
  Container,
  Title,
  Wrapper
};

export default Styled;
