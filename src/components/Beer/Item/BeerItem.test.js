import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import BeerItem from './BeerItem';
import SmallTextLoader from '../../UI/Loader/SmallTextLoader';

const setup = (params) => {
  configure({ adapter: new Adapter() });

  const onClickStub = sinon.spy();
  return {
    wrapper: shallow(<BeerItem {...params} onClick={onClickStub} />),
    onClickStub,
  };
};

describe('BeerItem component', () => {
  it('should render self', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render loader when is fetching', () => {
    const { wrapper } = setup({ isFetching: true });
    expect(wrapper.find(SmallTextLoader).exists()).toBe(true);
  });

  it('should fire onClick event', () => {
    const { wrapper, onClickStub } = setup();
    wrapper.find('div.beer-item').simulate('click');
    expect(onClickStub.calledOnce).toBe(true);
  });
});
