import TabBarIcon from '../components/TabBarIcon';
import { ExpoLinksView } from '@expo/samples';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default class AddDeckScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Deck',
    tabBarLabel: 'Add Deck',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='ios-add-circle'
        />
    )
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <ExpoLinksView />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
