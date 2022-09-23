import React from 'react';
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity 
} from 'react-native';

const Button = ({text, action, style, backgroundColor}) => {
    return (
        <TouchableOpacity 
            style={[
                styles.button,
                style,
                backgroundColor && { backgroundColor }
            ]}
            onPress={() => {
                if(action) 
                {
                    action();
                }
            }}
        >
            <Text
                style={styles.buttonText}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#50665a',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        width: '95%',
        height: 50,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20
    },
});
