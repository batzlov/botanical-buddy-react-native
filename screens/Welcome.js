import React from 'react';
import { 
    StyleSheet, 
    View, 
    StatusBar 
} from 'react-native';
import {
    Button,
    CoverImage,
    IntroHeadline
} from '../components';

const Welcome = ({navigation}) => {
    return (
        <View 
            style={styles.container}
        >
            <StatusBar 
                barStyle="light-content" 
            />
            <CoverImage>
                <IntroHeadline 
                    headline="Botanical Buddy." 
                    subHeadline="Dein Zuhause, jetzt grüner!" 
                />
                <View 
                    style={styles.btnContainer}
                >
                    <Button 
                        text="Los gehts!" 
                        action={() => {
                            navigation.navigate('SignUp');
                        }} 
                    />
                    <Button 
                        text="Einloggen" 
                        action={() => {
                            navigation.navigate('SignIn');
                        }} 
                    />
                </View>
            </CoverImage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headline: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    subHeadline: {
        fontSize: 18,
    },
    headlineContainer: {
        marginLeft: 15
    },
    btnContainer: {
        paddingTop: 20,
        alignItems: 'center'
    },
});

export default Welcome;