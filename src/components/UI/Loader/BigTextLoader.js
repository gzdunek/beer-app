import React from 'react';
import ContentLoader from 'react-content-loader';

const BigTextLoader = () => (
  <ContentLoader
    height={200}
    width={400}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="1.5" y="2.27" rx="4" ry="4" width="184.86" height="17.408" />
    <rect x="5.21" y="35" rx="3" ry="3" width="164.9" height="11.456000000000001" />
    <rect x="0" y="80" rx="3" ry="3" width="350" height="6.4" />
    <rect x="0" y="100" rx="3" ry="3" width="380" height="6.4" />
    <rect x="0" y="120" rx="3" ry="3" width="201" height="6.4" />
    <rect x="0" y="140" rx="3" ry="3" width="350" height="6.4" />
    <rect x="0" y="160" rx="3" ry="3" width="250" height="6.4" />
  </ContentLoader>
);

export default BigTextLoader;
