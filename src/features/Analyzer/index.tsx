import * as React from 'react';
import Browser from 'features/Browser/';
import Details from 'features/Details';
import Layout from 'features/Layout';

const Analyzer = () => (
  <Layout>
    <Browser />
    <Details />
  </Layout>
);

export default Analyzer;
