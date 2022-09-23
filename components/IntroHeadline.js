import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text 
} from 'react-native';

const IntroHeadline = ({headline, subHeadline}) => {
    return (
        <View
            style={styles.container}
        >
            <Text 
                style={styles.headline}
            >
                {headline}
            </Text>
            <Text 
                style={styles.subHeadline}
            >
                {subHeadline}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    headline: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    subHeadline: {
        marginTop: 3,
        fontSize: 18,
    },
});

export default IntroHeadline;
