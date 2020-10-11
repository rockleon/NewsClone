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
  View,
  Text,
  StatusBar,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import GraphScreen from './screens/GraphScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import feedsReducer from './store/reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {PersistGate} from 'redux-persist/integration/react';

const Stack = createStackNavigator();

// redux persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, feedsReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View flex-1 style={styles.topBar}>
            <Text style={styles.header}>News Clone</Text>
            <Icon
              name="line-chart"
              size={22}
              onPress={this.props.navigation.navigate('Graph')}
            />
          </View>
          <View style={styles.listView}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Graph" component={GraphScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

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
