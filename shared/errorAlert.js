import { Alert } from 'react-native';

export function errorAlert() {
    Alert.alert(
        ":(",
        "Etwas scheint schief gelaufen zu sein, bitte versuche es erneut.",
        [
            { 
                text: "OK", 
                onPress: () => {} 
            }
        ]
    );
};