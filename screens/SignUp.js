import React, {
    useState
} from "react";
import { 
    StyleSheet, 
    View
} from "react-native";
import axios from "axios";
import { 
    Button, 
    CoverImage, 
    Input, 
    IntroHeadline 
} from "../components";
import { 
    emailRegex,
    passwordRegex,
    stringRegex 
} from '../constants/regex';
import { errorAlert } from './../shared/errorAlert';

const SignUp = ({navigation}) => {
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const validateSignUp = (firstName, lastName, email, password) => {
        let faultyFields = [
            'firstName',
            'lastName',
            'email',
            'password'
        ];
        
        if(!stringRegex.test(firstName)) {
            setFirstNameError(true);
        } else {
            setFirstNameError(false);
            faultyFields = faultyFields.filter(e => e !== 'firstName');
        }

        if(!stringRegex.test(lastName)) {
            setLastNameError(true);
        } else {
            setLastNameError(false);
            faultyFields = faultyFields.filter(e => e !== 'lastName');
        }

        if(!emailRegex.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
            faultyFields = faultyFields.filter(e => e !== 'email');
        }

        if(!passwordRegex.test(password)) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
            faultyFields = faultyFields.filter(e => e !== 'password');
        }

        return faultyFields.length == 0;
    };

    const handleSignUp = async (user) => {
        try {
            const res = await axios.post(
                global.cfg.BASE_URL + "/sign-up",
                user,
            );
            resetSignUp();
            navigation.navigate("SignIn");
        } catch (err) {
            console.log(err);
            errorAlert();
        }
    };

    const resetSignUp = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    };

    return (
        <View style={styles.container}>
            <CoverImage>
                <IntroHeadline
                    headline="Registrieren"
                    subHeadline="Worauf wartest du noch?"
                />
                <View style={styles.formContainer}>
                    <Input
                        value={firstName}
                        onChange={setFirstName}
                        placeholder="Vorname"
                        isSecretField={false}
                        hasError={firstNameError}
                    />
                    <Input
                        value={lastName}
                        onChange={setLastName}
                        placeholder="Nachname"
                        isSecretField={false}
                        hasError={lastNameError}
                    />
                    <Input
                        value={email}
                        onChange={setEmail}
                        placeholder="E-Mail"
                        isSecretField={false}
                        hasError={emailError}
                        errorMsg="E-Mail ist ungültig"
                    />
                    <Input
                        value={password}
                        onChange={setPassword}
                        placeholder="Passwort"
                        isSecretField={true}
                        hasError={passwordError}
                        errorMsg="Passwort muss mindestens einen Großbustaben, einen Kleinbustaben, eine Zahl und 8 Zeichen enthalten. Sonderzeichen sind nicht erlaubt."
                    />
                </View>
                <View style={styles.btnContainer}>
                    <Button
                        text="senden"
                        style={styles.btn}
                        action={() => {
                            if(validateSignUp(firstName, lastName, email, password)) {
                                handleSignUp({firstName, lastName, email, password});
                            }
                        }}
                    />
                </View>
            </CoverImage>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        width: "60%",
    },
    btnContainer: {
        alignItems: "center",
    },
    formContainer: {
        alignItems: "center",
    },
});
