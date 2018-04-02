import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import BeerSmallItem from './BeerSmallItem';

const setup = () => {
  const beer = {
    image_url: 'http://xyz.com',
    name: 'Pale Ale',
  };

  const onClickStub = sinon.spy();
  configure({ adapter: new Adapter() });
  return {
    wrapper: shallow(<BeerSmallItem beer={beer} onClick={onClickStub} />),
    onClickStub,
  };
};

describe('BeerSmallItem component', () => {
  it('should render self', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should contain beer name when is not fetching', () => {
    const { wrapper } = setup();
    expect(wrapper.find('p.beer-small-item__name').text()).toBe('Pale Ale');
  });

  it('should fire onClick event', () => {
    const { wrapper, onClickStub } = setup();
    wrapper.find('div.beer-small-item').simulate('click');
    expect(onClickStub.calledOnce).toBe(true);
  });
});
