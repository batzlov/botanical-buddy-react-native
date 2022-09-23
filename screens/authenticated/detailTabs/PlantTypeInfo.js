import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';

const PlantTypeInfo = ({plantType}) => {
    const renderPlantTypeInfo = () => {
        const plantInfo = {
            descGer: 'Beschreibung',
            lightDesc: 'Licht',
            tempDesc: 'Temperatur',
            moistureDesc: 'Feuchtigkeit',
            earthDesc: 'Erde',
            fertilizeDesc: 'Düngen',
        };

        const plantTypeInfo = {
            descGer: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
            lightDesc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
            tempDesc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
            moistureDesc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
            earthDesc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
            fertilizeDesc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor',
        };



        const innerItems = [];
        
        Object.keys(plantInfo).forEach((key, i) => {
            innerItems.push(
                <View
                    key={i}
                >
                    <Text
                        style={styles.headline}
                    >
                        {plantInfo[key]}
                    </Text>
                    <Text
                        style={styles.text}
                    >
                        {plantTypeInfo[key]}
                    </Text>
                </View>
            );   
        });

        return innerItems;
    };

    return (
        <ScrollView
            bounces={false}
            contentContainerStyle={styles.container}
        >
            {renderPlantTypeInfo()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30
    },
    headline: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5
    },
    subHeadline: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 3
    },
    text: {
        color: '#000',
        fontSize: 16
    },
});

export default PlantTypeInfo;