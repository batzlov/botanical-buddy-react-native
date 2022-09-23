import React from 'react';
import {
    StyleSheet,
    StatusBar,
    SafeAreaView,
    View,
    Text
} from 'react-native';

import Divider from './Divider';

const Header = ({children, headline, subHeadline}) => {
    return (
        <View>
            <StatusBar barStyle="light-content" backgroundColor="#50665a" />
            <SafeAreaView
                style={styles.statusBar}
            >
                <View
                    style={styles.intro}
                >
                    <Text style={styles.headline}>
                        {headline}
                    </Text>
                    <Divider />
                    {
                        subHeadline ? 
                        <Text style={styles.subHeadline}>
                            {subHeadline}
                        </Text>
                        :
                        null
                    }
                    {children}
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    intro: {
        paddingHorizontal: 35,
        paddingBottom: 15,
    },  
    statusBar: {
        backgroundColor: '#50665a'
    },
    headline: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold'
    },
    subHeadline: {
        color: '#fff',
        paddingTop: 7,
        fontSize: 18
    },
});

export default Header;