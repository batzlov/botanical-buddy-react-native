import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = ({children, style}) => {
    return (
        <View style={[styles.card, style]}>
            <View style={styles.cardContent}>
                {children}
            </View>
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        backgroundColor: '#50665a'
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 15,
    }
});
