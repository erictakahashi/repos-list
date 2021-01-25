import { shallow } from 'enzyme';

import Home from '../Home';
import Styled from '../Home.styled';

/**
 * Factory function that will create a `Home` shallow wrapper.
 */
const setup = () => shallow(<Home />);

describe('Home', () => {
  it('should render a `wrapper` container', () => {
    const component = setup();
    const wrapper = component.find(Styled.Wrapper);
    expect(wrapper.length).toBe(1);
  });
});
