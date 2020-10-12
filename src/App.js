/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import GraphScreen from './screens/GraphScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import feedsReducer from './store/reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';

// redux persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, feedsReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  changeTab = () => {
    const activeTab = this.state.activeTab === 0 ? 1 : 0;
    this.setState({activeTab});
  };

  render() {
    const activeScreen =
      this.state.activeTab === 0 ? <HomeScreen /> : <GraphScreen />;
    const iconName = this.state.activeTab === 0 ? 'line-chart' : 'home';

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View flex-1 style={styles.topBar}>
              <Text style={styles.header}>News Clone</Text>
              <TouchableOpacity
                onPress={() => {
                  this.changeTab();
                }}>
                <Icon name={iconName} size={22} />
              </TouchableOpacity>
            </View>
            <View style={styles.listView}>{activeScreen}</View>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#f6f6ef',
  },
  topBar: {
    backgroundColor: '#ff6600',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
