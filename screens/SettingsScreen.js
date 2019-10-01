import React, { Component } from 'react';
import {
    StyleSheet,
    Switch,
    View,
} from 'react-native';

export default class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings',
        tabBarLabel: 'Settings'
    };

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        alignItems: "flex-start",
                        flex: 1,
                        justifyContent: "center",
                    }}
                >
                    Settings
                </View>
                <View
                    style={{
                        alignItems: "flex-end",
                        flex: -1,
                        justifyContent: "center",
                    }}
                >
                    <Switch></Switch>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    }
});