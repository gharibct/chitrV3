import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import authReducer from './store/reducers/auth';
//import errorReducer from './store/reducers/error';
import certReducer from './store/reducers/cert';
import photoReducer from './store/reducers/photo';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';


import AppNavigator from './navigation/AppNavigator'

const rootReducer = combineReducers({
  auth: authReducer,
  //error:errorReducer,
  cert:certReducer,
  photo:photoReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  
  const [fontLoaded,setFontLoaded] = useState(false);

  if(!fontLoaded)
  {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
