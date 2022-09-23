import React from 'react';
import { 
    StyleSheet,
    View, 
    Text, 
    TextInput
} from 'react-native';
  
const Input = ({value, onChange, isSecretField, placeholder, hasError, errorMsg, onFocus, callback, style}) => {
    return (
        <View
            style={styles.inputWrapper}
        >
            <TextInput
                style={[styles.input, {
                    borderColor: hasError ? 'red' : 'black',
                    ...style 
                }]}
                onChangeText={(text) => {
                    onChange(text);

                    if(callback) 
                    {
                        callback();
                    }
                }}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#4C4C4C"
                autoCapitalize="none"
                secureTextEntry={isSecretField}
                onFocus={() => {
                    if(onFocus) 
                    {
                        onFocus();
                    }
                }}
            />
            {   
                hasError == true ? 
                <Text
                    style={styles.errorMsg}
                >
                    {
                        errorMsg ? errorMsg : 'Fehler, bitte überprüfe deine Eingabe.'
                    }
                </Text>
                : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        width: '95%'
    },
    input: {
        height: 50,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, .3)',
        width: '100%'
    },
    errorMsg: {
        marginLeft: 5,
        marginTop: -7,
        color: 'red'
    }
});

export default Input;