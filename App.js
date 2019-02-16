import Colors from './constants/Colors';
import { AppLoading, Constants, Font, Icon } from 'expo';
import middleware from './middleware';
import AppNavigator from './navigation/AppNavigator';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore } from 'redux';
import { clearLocalNotification, setLocalNotification } from "./utils/notifications";

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
  };
  componentDidMount() {
    //clearLocalNotification().then(setLocalNotification);
    setLocalNotification();
  }
  render() {
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
