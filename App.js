/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar, Text
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Board from './src/containers/Board'
const App = () => {
  return (
    <Board />
  );
};


export default App;
