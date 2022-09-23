import React from 'react';
import { 
    StyleSheet, 
    ScrollView, 
    View,
    Text, 
    Modal,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import {
    Input,
    Button
} from '../../../components';

const SelectPlantType = ({setPlantTypeModalVisible, setPlantType, setPlantTypeId}) => {
    const [plantTypeName, setPlantTypeName] = React.useState('');
    const [plantTypes, setPlantTypes] = React.useState([]);

    const fetchAllPlantTypes = async () => {
        try 
        {
            const res = await axios.get(global.cfg.BASE_URL + '/plant-types');
            setPlantTypes(res.data);
        }
        catch(err) 
        {
            console.error(err);
        }
    };
    
    const fetchPlantTypesByName = async (name) => {
        try 
        {
            const res = await axios.get(global.cfg.BASE_URL + '/plant-types', {
                params: {
                    nameString: name
                }
            });

            setPlantTypes(res.data);
        }
        catch(err) 
        {
            console.error(err);
        }
    };
    
    React.useEffect(() => {
        fetchAllPlantTypes();
        fetchPlantTypesByName('');

        return () => {
            setPlantTypes({})
        };
    }, []);

    const generateSelectableItems = () => {
        const items = [];

        if(plantTypes.length > 0) 
        {
            plantTypes.forEach((plant) => {
                items.push(
                    <View
                        style={styles.plantItem}
                        key={Math.random()}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                setPlantType(plant.nameLat);
                                setPlantTypeId(plant.id);
                                setPlantTypeModalVisible(false);
                            }}
                        >
                            <Text
                                style={styles.textCenter}
                            >
                                {plant.nameGer} - {plant.nameLat}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            });
        }
        else 
        {
            items.push(
                <View
                    style={styles.plantItem}
                    key={Math.random()}
                >
                    <Text
                        style={styles.textCenter}
                    >
                        Zu diesem Namen wurde keine Pflanzenart in der Datenbank gefunden.
                    </Text>
                </View>
            );
        }

        return items;
    };

    return (
        <Modal
            animationType="slide"
        >
            <View
                style={styles.centeredView}
            >
                <ScrollView
                    style={styles.modalView}
                >
                    <Input
                        value={plantTypeName}
                        onChange={setPlantTypeName}
                        placeholder="Suche eine Pflanzenart..."
                        callback={() => {
                            fetchPlantTypesByName(plantTypeName);
                        }}
                        style={styles.input}
                        isSecretField={false}
                    />
                    <Button 
                        text="zurück" 
                        style={styles.backBtn} 
                        action={() => {
                            setPlantTypeModalVisible(false);
                        }}
                    />
                    <View
                        style={styles.itemView}
                    >
                        {generateSelectableItems()}
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '105%'
    },
    itemView: {
        marginBottom: 40
    },
    backBtn: {
        height: 40,
        marginTop: -5,
        width: '100%',
        backgroundColor: 'red'
    },
    textCenter: {
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.95)'
    },
    modalView: {
        width: '90%',
        height: '80%',
        padding: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 40
    },
    plantItem: {
        padding: 10,
        backgroundColor: '#dedede',
        marginVertical: 3,
        borderRadius: 10
    }
});

export default SelectPlantType;