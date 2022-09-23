import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    Alert,
} from 'react-native';
import axios from 'axios';

import {
    Header,
    AnimatedFlatList,
    NormalFlatList
} from '../../components';

const Plants = ({ navigation, route }) => {
    const [plants, setPlants] = React.useState([]);
    const useAnimatedFlatList = false;

    const fetchPlants = async () => {
        try {
            const res = await axios.get(global.cfg.BASE_URL + "/plants", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + global.token,
                }
            });

            return res.data;
        } catch(err) {
            console.log(err);
            return null;
        }
    }; 

    React.useEffect(() => {
        navigation.addListener('focus', async () => {
            let fetchtedPlants = await fetchPlants();
            setPlants(fetchtedPlants);

            return () => {
                setPlants({});
            }
        });
    }, []);

    return (
        <View
            style={{
                marginBottom: 150,
            }}
        >
            <Header
                headline="Amigos"
                subHeadline="Verwalte deine Pflanzen"
            >
                <TouchableOpacity
                        onPress={() => {
                        navigation.navigate('CreatePlant');
                    }}
                >
                    <Text style={styles.addPlantText}>
                        Möchtest du einen neuen Amigo hinzufügen?
                    </Text>
                </TouchableOpacity>
            </Header>
            {
                useAnimatedFlatList ?
                <AnimatedFlatList 
                    navigation={navigation}
                    plants={plants} 
                />
                : 
                <NormalFlatList 
                    navigation={navigation}
                    plants={plants} 
                />
            }
        </View>
    );
};

export default Plants;

const styles = StyleSheet.create({
    headline: {
        fontSize: 20,
        margin: 5,
        fontWeight: 'bold',
        color: 'white'
    },
    addPlantText: {
        textDecorationLine: 'underline',
        marginVertical: 5,
        color: 'white'
    },
    header: {
        backgroundColor: '#50665a',
    },
    headerContent: {
        paddingTop: 10,
        paddingLeft: 35,
        paddingRight: 35,
        paddingBottom: 10
    },
    introText: {
        margin: 5,
        fontSize: 15,
        color: 'white'
    },
});
