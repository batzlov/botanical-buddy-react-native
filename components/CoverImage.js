import React from 'react';
import { 
    StyleSheet, 
    View,  
    ImageBackground
} from 'react-native';

const plantBackground = require('../assets/images/plant_bg.jpg');

const CoverImage = ({children, style}) => {
    return (
        <ImageBackground
            source={plantBackground}
            resizeMode="cover"
            style={[
                styles.imageBackground,
                style
            ]}
        >
            <View
                style={styles.overlay}
            >
                {children}
            </View>
        </ImageBackground>   
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center'
    },
    overlay: {
        borderRadius: 20,
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, .8)'
    }
});

export default CoverImage;
