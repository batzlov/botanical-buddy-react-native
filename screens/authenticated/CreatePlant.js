import React from 'react';
import { 
    StyleSheet, 
    View,
    Text, 
    TouchableOpacity,
    Image,
} from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import {
    Button,
    Input,
    Header,
    Card
} from '../../components';
import CameraHandler from './CameraHandler';
import {
    stringRegex
} from '../../constants/regex';
import SelectPlantType from "./modals/SelectPlantType";

const CreatePlant = ({navigation}) => {
    const [plantName, setPlantName] = React.useState('');
    const [plantNameError, setPlantNameError] = React.useState(false);
    const [plantType, setPlantType] = React.useState('');
    const [plantTypeId, setPlantTypeId] = React.useState(0);
    const [plantTypeError, setPlantTypeError] = React.useState(false);
    const [plantHeight, setPlantHeight] = React.useState('');
    const [plantHeightError, setPlantHeightError] = React.useState(false);
    const [plantImage, setPlantImage] = React.useState({});
    const [plantImageError, setPlantImageError] = React.useState(false);
    const [cameraIsActive, setCameraIsActive] = React.useState(false);
    const [plantTypeModalVisible, setPlantTypeModalVisible] = React.useState(false);

    const validateCreatePlant = (name, typeId, height, image) => {
        let faultyFields = [
            'name',
            'typeId',
            'height',
            'image'
        ];

        if(!stringRegex.test(name)) {
            setPlantNameError(true);
        } else {
            setPlantNameError(false);
            faultyFields = faultyFields.filter(e => e !== 'name');
        }

        if(typeId == 0) {
            setPlantTypeError(true);
        } else {
            setPlantTypeError(false);
            faultyFields = faultyFields.filter(e => e !== 'typeId');
        }

        if(!stringRegex.test(height)) {
            setPlantHeightError(true);
        } else {
            setPlantHeightError(false);
            faultyFields = faultyFields.filter(e => e !== 'height');
        }
        
        if(typeof image.base64 == 'undefined') {
            setPlantImageError(true);
        } else {
            setPlantImageError(false);
            faultyFields = faultyFields.filter(e => e !== 'image');
        }

        return faultyFields.length == 0;
    };

    const saveCreatePlant = async () => {
        try 
        {
            const res = await axios.post(global.cfg.BASE_URL + '/plants', {
                name: plantName, 
                type: plantType,
                height: plantHeight, 
                typeId: plantTypeId,
                image: plantImage.base64
            });
            navigation.navigate('Amigos', {
                rerender: true
            });
        } 
        catch(error) 
        {
            console.log(error);
        } 
    };

    if(cameraIsActive) 
    {
        return <CameraHandler setPlantImage={setPlantImage} setCameraIsActive={setCameraIsActive} />
    }
    else 
    {
        return (
            <View>
                <Header
                    headline="Pflanze hinzufügen"
                    subHeadline="Bitte fülle das Formular aus und klicke dann auf senden."
                />
                <Card
                    style={styles.card}
                >
                <View
                    style={styles.formView}
                >
                    <Input
                        value={plantName}
                        onChange={setPlantName}
                        placeholder="Name"
                        isSecretField={false}
                        hasError={plantNameError}
                    />
                    <Input
                        value={plantType}
                        onChange={setPlantType}
                        placeholder="Art"
                        onFocus={() => {
                            setPlantTypeModalVisible(true);    
                        }}
                        isSecretField={false}
                        hasError={plantTypeError}
                    />
                    {
                        plantTypeModalVisible &&
                        <SelectPlantType 
                            setPlantTypeModalVisible={setPlantTypeModalVisible} 
                            setPlantType={setPlantType} 
                            setPlantTypeId={setPlantTypeId} 
                        />
                    }
                    <Input
                        value={plantHeight}
                        onChange={setPlantHeight}
                        placeholder="Höhe in cm"
                        isSecretField={false}
                        hasError={plantHeightError}
                    />
                </View>
                <Text
                    style={styles.subHeadline}
                >  
                    Bitte füge ein Bild deiner Pflanze hinzu.
                </Text>
                { 
                    plantImageError &&
                    <Text
                        style={styles.error}
                    >
                        Überprüfe das Bild
                    </Text>
                }
                    <View
                        style={styles.formView}
                    >
                        {plantImage.base64 &&
                            <View
                                style={styles.row}
                            >
                                <Image 
                                    source={{uri: `data:image/jpeg;base64,${plantImage.base64}`}}
                                    style={styles.imagePreview}
                                />
                                <TouchableOpacity
                                    style={[styles.addPhotoBtn, {
                                        marginLeft: 20
                                    }]}
                                    onPress={() => {
                                        setCameraIsActive(true);
                                    }}
                                >
                                    <FontAwesome5 name="camera" size={38} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        }
                        {!plantImage.base64 &&    
                            <TouchableOpacity
                                style={styles.addPhotoBtn}
                                onPress={() => {
                                    setCameraIsActive(true);
                                }}
                            >
                                <FontAwesome5 name="camera" size={38} color="#fff" />
                            </TouchableOpacity>
                        }
                        <View
                            style={styles.btnView}
                        >
                            <Button 
                                text="zurück" 
                                style={styles.marginHorizontal4}
                                action={() => {
                                    navigation.goBack();
                                }} 
                            />
                            <Button 
                                text="speichern" 
                                style={styles.marginHorizontal4}
                                action={async () => {
                                    if(validateCreatePlant(plantName, plantTypeId, plantHeight, plantImage)) 
                                    {
                                        await saveCreatePlant();
                                    }
                                }} 
                            />
                        </View>
                    </View>
                </Card>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 10
    },
    marginHorizontal4: {
        marginHorizontal: 4
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    formView: {
        alignItems: 'center',
        marginVertical: 10
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
    imagePreview: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10
    },
    btnView: {
        marginTop: 20,
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    addPhotoBtn: {
        height: 70,
        width: 70,
        borderRadius: 70,
        backgroundColor: '#690041',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {
        color: '#000',
        fontSize: 20,
        margin: 5,
        fontWeight: 'bold'
    },
    subHeadline: {
        color: '#000',
        fontSize: 16,
        marginLeft: 10
    },
    error: {
        color: 'red',
        textAlign: 'center',
    }
});

export default CreatePlant;
