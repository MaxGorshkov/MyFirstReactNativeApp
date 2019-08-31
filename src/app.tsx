import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { View } from 'react-native';

import { configureStore, history } from './redux/store/configureStore';
import { MainMenu } from './app/shared/components/mainMenu';
import { styles } from './style';
import { Content } from './app/routing';

// tslint:disable-next-line
let global: any;
global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;

export const store = configureStore();

export const App = () => {
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
  console.log('usingHermes', usingHermes);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <View style={{flex: 1}}>
          <View style={styles.content}>
            {Content}
          </View>
          <View style={styles.menu}>
            <MainMenu/>
          </View>
        </View>
      </ConnectedRouter>
    </Provider>
  );
};
