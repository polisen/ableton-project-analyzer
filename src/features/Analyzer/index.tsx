import React from 'react';
// import { useFirebase } from 'react-redux-firebase';
import Browser from 'features/Browser/';
import Details from 'features/Details';
import Layout from 'features/Layout';
// import { useDispatch } from 'react-redux';
// import { buildStructure, useAbletonAnalyzer } from 'hooks/useAbletonAnalyzer';
// import { setFileStructure } from 'slices/analyzerSlice';

const Analyzer = () => (
  <Layout>
    <Browser />
    <Details />
  </Layout>
);

export default Analyzer;
