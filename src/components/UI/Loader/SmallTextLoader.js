import React from 'react';
import ContentLoader from 'react-content-loader';

const SmallTextLoader = () => (
  <ContentLoader
    height={55}
    width={400}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="5" rx="4" ry="4" width="250" height="14.69" />
    <rect x="0" y="34" rx="4" ry="4" width="200" height="19.2" />
  </ContentLoader>
);

export default SmallTextLoader;
