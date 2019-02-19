import Colors from './constants/Colors';
import { AppLoading, Constants, Font, Icon } from 'expo';
import middleware from './middleware';
import AppNavigator from './navigation/AppNavigator';
import React from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore } from 'redux';
import Sentry from 'sentry-expo';
import { clearLocalNotification, setLocalNotification } from "./utils/notifications";
import config from './config';

const { SENTRY_DSN } = config;

// Remove this once Sentry is correctly setup.
//Sentry.enableInExpoDevelopment = true;

Sentry.config(SENTRY_DSN).install();

const store = createStore(reducer, middleware);

function AppStatusBar ({backgroundColor, ...props}) {
  return (
      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
      </View>
  );
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    error: false
  };
  componentDidMount() {
    //clearLocalNotification().then(setLocalNotification);
    setLocalNotification();
  }
  componentDidCatch(error, errorInfo) {
    this.setState({error: true});
    Sentry.captureException(error);
  }
  render() {
    if(this.state.error){
      return (
          <Text
            style={{marginTop: '50%'}}
          >There was a fatal error. Please contact spencer@aninternetpresence.net for assistance.
          </Text>
      );
    }
    if (!(this.state.isLoadingComplete || this.props.skipLoadingScreen)) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <AppStatusBar backgroundColor={Colors.statusBar} barStyle="light-content" />
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in DeckScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
