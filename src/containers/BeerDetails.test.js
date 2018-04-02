import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BeerDetailsContainer } from './BeerDetails';
import BeerDetails from '../components/Beer/Details/BeerDetails';
import FetchError from '../components/UI/FetchError/FetchError';

const setup = (params) => {
  const beerDetails = {
    id: 2,
    name: 'Trashy Blonde',
    tagline: 'You Know You Shouldn\'t',
    first_brewed: '04/2008',
    description: 'A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure; what would your mother say? The seductive lure of the sassy passion fruit hop proves too much to resist. All that is even before we get onto the fact that there are no additives, preservatives, pasteurization or strings attached. All wrapped up with the customary BrewDog bite and imaginative twist.',
    image_url: 'https://images.punkapi.com/v2/2.png',
    abv: 4.1,
    ibu: 41.5,
    target_fg: 1010,
    target_og: 1041.7,
    ebc: 15,
    srm: 15,
    ph: 4.4,
    attenuation_level: 76,
  };

  const dispatch = jest.fn();

  configure({ adapter: new Adapter() });
  return shallow(<BeerDetailsContainer
    beerDetails={beerDetails}
    dispatch={dispatch}
    {...params}
  />);
};

describe('BeerDetails Container', () => {
  it('should render sucessfully without beer provided', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should not render BeerDetails when an error occured', () => {
    const wrapper = setup({ errorMessage: 'An error' });
    expect(wrapper.find(BeerDetails).exists()).toBe(false);
    expect(wrapper.find(FetchError).exists()).toBe(true);
  });

  it('should render BeerDetails when is no error', () => {
    const wrapper = setup();
    expect(wrapper.find(BeerDetails).exists()).toBe(true);
    expect(wrapper.find(FetchError).exists()).toBe(false);
  });
});
