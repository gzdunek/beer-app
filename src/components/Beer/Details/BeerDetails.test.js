import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BeerDetails from './BeerDetails';
import BigTextLoader from '../../UI/Loader/BigTextLoader';

const setup = (params) => {
  configure({ adapter: new Adapter() });
  return shallow(<BeerDetails {...params} />);
};

describe('BeerDetails component', () => {
  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render loader when is fetching', () => {
    const wrapper = setup({ isFetching: true });
    expect(wrapper.find(BigTextLoader).exists()).toBe(true);
  });
});
