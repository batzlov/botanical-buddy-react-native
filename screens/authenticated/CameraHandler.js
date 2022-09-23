import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';
import {
    Camera
} from 'expo-camera';
import { 
    manipulateAsync, 
    SaveFormat 
} from 'expo-image-manipulator';
import { 
    FontAwesome,
    FontAwesome5 
} from '@expo/vector-icons';

const CameraView = ({type, setType, setPlantImage, setCameraIsActive}) => {
    let camera = null;
    const [capturedPhoto, setCapturedPhoto] = React.useState({});

    if(Object.keys(capturedPhoto).length > 0) {
        return (
            <SafeAreaView
                style={styles.preview}
            >
                <Image 
                    style={styles.previewImage}
                    source={capturedPhoto}
                />
                <View style={styles.previewButtonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setCapturedPhoto({});
                        }}
                    >
                        <FontAwesome name="refresh" size={40} color="white" />  
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                            setPlantImage(capturedPhoto);
                            setCameraIsActive(false);
                        }}
                    >
                        <FontAwesome name="check-circle" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <Camera 
                    style={styles.camera} 
                    type={type}
                    ref={(ref) => {
                        camera = ref;
                    }}
                >
                    <View 
                        style={styles.topBorder}
                    />
                    <View 
                        style={styles.cameraView}
                    />
                    <View style={styles.bottomBorder}>
                        <TouchableOpacity
                            style={styles.switchCameraBtn}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <FontAwesome name="refresh" size={40} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cameraBtn}
                            onPress={async () => {
                                if (camera) {
                                    try {
                                        let photo = await camera.takePictureAsync({
                                            base64: false,
                                        });

                                        const resizedDimensions = {
                                            height: 512,
                                            width: 512
                                        };

                                        const originX = 0;
                                        const originY = 0.5 * photo.height - 0.5 * photo.width;

                                        const resizedPhoto = await manipulateAsync(photo.uri, [
                                            {crop: {
                                                height: photo.width, 
                                                originX: originX, 
                                                originY: originY, 
                                                width: photo.width
                                            }},
                                            {   
                                                resize: {
                                                height: resizedDimensions.height,
                                                width: resizedDimensions.width
                                            }}
                                        ], {
                                            compress: 0.7,
                                            format: SaveFormat.JPEG,
                                            base64: true
                                        });

                                        setCapturedPhoto(resizedPhoto);
                                    }
                                    catch (err) {
                                        console.error(err);
                                    }
                                }
                            }}>
                            <FontAwesome5 name="camera" size={38} color="#000" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
    }
};

const CameraHandler = ({setPlantImage, setCameraIsActive}) => {
    const [hasPermission, setHasPermission] = React.useState(null);
    const [type, setType] = React.useState(Camera.Constants.Type.back);

    React.useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <CameraView 
            type={type} 
            setType={setType} 
            setPlantImage={setPlantImage} 
            setCameraIsActive={setCameraIsActive} 
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    topBorder: {
        flex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
    },
    cameraView: {
        flex: 4
    },
    bottomBorder: {
        flex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -40
    },
    previewButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
        color: 'white',
    },
    preview: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        flex: 1,
        justifyContent: 'center'
    },
    previewImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    switchCameraBtn: {
        marginLeft: -100,
        paddingRight: 100
    },
    cameraBtn: {
        height: 90,
        width: 90,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CameraHandler
