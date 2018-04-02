import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BeerList from './BeerList';
import BeerItem from '../Item/BeerItem';

const setup = () => {
  const beers = [
    {
      id: 1,
      name: 'Buzz',
      tagline: 'A Real Bitter Experience.',
      first_brewed: '09/2007',
      description: 'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
      image_url: 'https://images.punkapi.com/v2/keg.png',
      abv: 4.5,
      ibu: 60,
      target_fg: 1010,
      target_og: 1044,
      ebc: 20,
      srm: 10,
      ph: 4.4,
      brewers_tips: 'The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.',
      contributed_by: 'Sam Mason <samjbmason>',
    },
  ];

  const onBeerClick = jest.fn();
  const loadMoreBeers = jest.fn();

  configure({ adapter: new Adapter() });
  return shallow(<BeerList
    beers={beers}
    onBeerClick={onBeerClick}
    loadMoreBeers={loadMoreBeers}
  />);
};

describe('BeerList Component', () => {
  it('should render self', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render one BeerItem component', () => {
    const wrapper = setup();
    expect(wrapper.find('div').children(BeerItem).length).toBe(1);
  });
});
