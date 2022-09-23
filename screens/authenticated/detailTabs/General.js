import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const General = ({navigation, plant}) => {
    const showRemovePlantAlert = (id) => {
        Alert.alert(
            "Achtung :(",
            "Möchtest du deinen Amigo wirklich löschen?",
            [
                {
                    text: "abbrechen",
                    onPress: () => {},
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: () => {
                        removePlant(id);
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    const removePlant = async (id) => {
        try 
        {
            const res = await axios.delete(global.cfg.BASE_URL + '/plants/' + id);
        } 
        catch(err) 
        {
            console.log(err);
        } 
    };

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.headline}
            >
                {plant.name}
            </Text>
            <Text
                style={styles.text}
            >  
                ist eine Pflanze vom Typ "{plant.type}". Deine Pflanze hat 
                derzeit eine Höhe von {plant.height} cm.
            </Text>
            <View
                style={styles.btnRow}
            >
                <View>
                    <Text
                        style={styles.generalHeadline}
                    >
                        Möchtest du die Pflanze löschen?
                    </Text>
                    <Text>
                        Abschiede sind immer schwer..
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                        showRemovePlantAlert(plant.id);
                    }}
                >
                    <FontAwesome name="trash" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 15,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headline: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    subHeadline: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 5
    },
    generalHeadline: {
        fontSize: 17,
        marginTop: 15,
        fontWeight: 'bold'
    },
    text: {
        color: '#000',
        fontSize: 16
    },
    btnContainer: {
        marginVertical: 60,
        alignItems: 'center',
        width: '100%'
    },
    deleteBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 20
    },
});

export default General;