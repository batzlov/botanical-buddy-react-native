import React from 'react';
import { 
    StyleSheet, 
    View 
} from 'react-native';

const Divider = () => {
    return (
        <View
            style={styles.divider}
        />
    );
};

const styles = StyleSheet.create({
    divider: {
        height: 3,
        marginVertical: 2,
        backgroundColor: '#fff'
    }
});

export default Divider;
