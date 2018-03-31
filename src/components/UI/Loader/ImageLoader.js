import React from 'react';
import ContentLoader from 'react-content-loader';

const ImageLoader = () => (
  <ContentLoader
    height={400}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="400" height="400" />
  </ContentLoader>
);

export default ImageLoader;
