import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const ActivityLoading = props => {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
};

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#F5FCFF88',
        elevation: 10,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ActivityLoading;
