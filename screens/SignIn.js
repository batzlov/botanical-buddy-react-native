import React, {
    useState
} from 'react';
import { 
    StyleSheet, 
    View, 
    Alert 
} from 'react-native';
import axios from 'axios';
import {
    Button,
    Input,
    CoverImage,
    IntroHeadline
} from '../components';
import {
    emailRegex,
    passwordRegex
} from '../constants/regex';

const SignIn = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const validateSignIn = (email, password) => {
        let faultyFields = [
            'email',
            'password'
        ];        
        
        if(!emailRegex.test(email)) {
            setEmailError(true);
        } else {
            faultyFields = faultyFields.filter(e => e !== 'email');
            setEmailError(false);
        }

        if(!passwordRegex.test(password)) {
            setPasswordError(true);
        } else {
            faultyFields = faultyFields.filter(e => e !== 'password');
            setPasswordError(false);
        }

        return faultyFields.length == 0;
    };

    const handleSignIn = async (email, password) => {
        try {
            const res = await axios.post(global.cfg.BASE_URL + '/sign-in', {
                email, 
                password
            });

            global.user = res.data.user;
            global.token = res.data.token;

            resetSignIn();

            navigation.navigate('Home');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch(err) {
            createValidationErrorAlert();
            console.log(err);
        }
    };

    const resetSignIn = () => {
        setEmail('');
        setPassword('');
    };

    const createValidationErrorAlert = () => {
        Alert.alert(
            ":(",
            "Bitte überprüfe deine Angaben",
            [
                { 
                    text: "OK", 
                    onPress: () => {} 
                }
            ]
        );
    };

    return (
        <View 
            style={styles.container}
        >
            <CoverImage>
                    <IntroHeadline 
                        headline="Anmelden"
                        subHeadline="Deine Pflanzen warten!"
                    />
                    <View
                        style={styles.formContainer}
                    >
                        <Input 
                            value={email}
                            onChange={setEmail}
                            placeholder="E-Mail"
                            isSecretField={false}
                            hasError={emailError} 
                            errorMsg="E-Mail ist ungültig."
                        />
                        <Input 
                            value={password}
                            onChange={setPassword}
                            placeholder="Passwort"
                            isSecretField={true}
                            hasError={passwordError} 
                            errorMsg="Passwort ist ungültig."
                        />
                    </View>
                    <View
                        style={styles.btnContainer}
                    >
                        <Button 
                            text="senden"
                            style={styles.btn} 
                            action={() => {
                                if(validateSignIn(email, password)) {
                                    handleSignIn(email, password);
                                } else {
                                    createValidationErrorAlert();
                                }
                            }} 
                        />
                    </View>
            </CoverImage>
        </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    btn: {
        width: '60%'
    },
    btnContainer: {
        alignItems: 'center'
    },
    container: {
        flex: 1,
    },
    formContainer: {
        alignItems: 'center'
    },
});