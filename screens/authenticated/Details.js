import React from 'react';
import { 
    StyleSheet,
    View, 
    Text,
    Alert,
    Image,
    TouchableOpacity 
} from 'react-native';
import axios from 'axios';
import { 
    FontAwesome,
} from '@expo/vector-icons';
import {
    General,
    Diary,
    PlantTypeInfo
} from './detailTabs';

const Details = ({ route, navigation }) => {
    const TABS = {
        GENERAL: 1,
        DIARY: 2,
        PLANT_TYPE: 3
    };
    const [activeTab, setActiveTab] = React.useState(TABS.GENERAL);
    const { 
        plantId, 
        plantName, 
        plantType, 
        plantHeight, 
        plantImage, 
        plantTypeInfo 
    } = route.params;

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

    const renderTabBar = () => {
        const activeColor = 'white';
        const inactiveColor = '#acacac';

        const tabItems = [
            {
                id: TABS.GENERAL,
                iconName: 'home',
                label: 'Allgemein',
                isActive: activeTab == TABS.GENERAL
            },
            {
                id: TABS.DIARY,
                iconName: 'book',
                label: 'Tagebuch',
                isActive: activeTab == TABS.DIARY
            },
            {
                id: TABS.PLANT_TYPE,
                iconName: 'leaf',
                label: 'Art-Details',
                isActive: activeTab == TABS.PLANT_TYPE
            }
        ];

        const renderedItems = [];
        tabItems.forEach((tab) => {
            renderedItems.push(
                <TouchableOpacity
                    style={styles.tabBtn}
                    key={tab.id}
                    onPress={() => {
                        setActiveTab(tab.id);
                    }}
                >
                    <FontAwesome name={tab.iconName} size={tab.isActive ? 30 : 22} color={tab.isActive ? activeColor : inactiveColor} />
                    <Text
                        style={tab.isActive ? styles.tabBtnText : styles.tabBtnTextInactive}
                    >
                        {tab.label}
                    </Text>
                </TouchableOpacity>
            );
        });

        return (
            <View
                style={styles.tabBar}
            >
                {renderedItems}
            </View>
        );
    };

    const renderTabContent = () => {
        let content = null;

        switch(activeTab) 
        {
            case TABS.GENERAL:
                content = <General plant={{
                    id: plantId, 
                    name: plantName, 
                    type: plantType, 
                    height: plantHeight
                }} plantType={plantTypeInfo} navigation={navigation} />;
                break;
            case TABS.DIARY:
                content = <Diary plantId={plantId} />;
                break;
            case TABS.PLANT_TYPE:
                content = <PlantTypeInfo plantType={plantTypeInfo} />;
                break;
        }

        return content;
    };
    
    return (
        <View
            style={styles.container}
        >
            <Image 
                source={{uri: plantImage}}
                style={styles.plantImage}
            />
            {renderTabBar()}
            {renderTabContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    plantImage: {
        height: 300,
        width: '100%',
        resizeMode: 'cover'
    },
    tabBar: {
        height: 60,
        backgroundColor: '#50665a',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    tabBtnText: {
        fontSize: 12,
        color: 'white'
    },
    tabBtnTextInactive: {
        fontSize: 12,
        color: '#acacac'
    },
    tabBtn: {
        height: 60,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
    },
    btnContainer: {
        marginVertical: 40,
        alignItems: 'center',
        width: '100%'
    },
    headline: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    },
    subHeadline: {
        color: '#000',
        fontSize: 18
    },
});

export default Details;
