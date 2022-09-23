import React, { 
    useState,
    useEffect 
} from 'react';
import axios from 'axios';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    Alert
} from 'react-native';
import {
    Button,
    Input
} from '../../../components';
import { numberRegex } from '../../../constants/regex';
import { FontAwesome } from '@expo/vector-icons';
import {
    LineChart
} from "react-native-chart-kit";

const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
};

const chartWidth = Dimensions.get("window").width - 40;

const Diary = ({plantId}) => {
    const [plantHeight, setPlantHeight] = useState('');
    const [plantHeightError, setPlantHeightError] = useState(false);
    const [dairyModalVisible, setDairyModalVisible] = useState(false);

    const [heightValues, setHeightValues] = useState([
        20,
        20,
        20
    ]);
    const [labelValues, setLabelValues] = useState([
        "01.01.22", 
        "08.01.22",
        "15.01.22"
    ]);

    const fetchChartData = async () => {
        const res = await axios.get(global.cfg.BASE_URL + '/' + plantId + '/diary-entries');

        let labels = [];
        let values = [];
    
        let numOfEntries = res.data.diaryEntries.length;
        let onlyShowFirstAndLast = numOfEntries > 4;
        res.data.diaryEntries.forEach((entry, index) => {
            if(onlyShowFirstAndLast && (index == 0 || index == (numOfEntries - 1))) 
            {
                labels.push(entry.notedAt);
            }
            else if(!onlyShowFirstAndLast) 
            {
                labels.push(entry.notedAt);
            }
            values.push(entry.heightMeasured);
        });

        setHeightValues(values);
        setLabelValues(labels);
    };

    const chartData = {
        labels: labelValues,
        datasets: [
            {
                data: heightValues,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2 
            }
        ],
        legend: ["Höhe in cm"] 
    };

    useEffect(() => {
        fetchChartData();

        return () => {
            setHeightValues([]);
            setLabelValues([]);
        };
    }, []);

    const validateDiaryEntry = (plantHeight) => {
        let faultyFields = [
            'plantHeight'
        ];

        if(!numberRegex.test(plantHeight)) {
            setPlantHeightError(true);
        } else {
            faultyFields = [];
            setPlantHeightError(false);
        }

        return faultyFields.length == 0;
    };

    const createErrorAlert = () => {
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

    const submitDairyEntry = async (plantHeight) => {
        try 
        {
            const res = await axios.post(global.cfg.BASE_URL + '/' + plantId + '/diary-entries', {
                plantHeight: plantHeight
            });
            resetDairyEntry();
            setDairyModalVisible(false);
            fetchChartData();
        }
        catch(err) 
        {
            console.error(err);
            createErrorAlert();
        }
    };

    const resetDairyEntry = () => {
        setPlantHeight('');
        setPlantHeightError(false);
    };

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.centeredView}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={dairyModalVisible}
                >
                    <View
                        style={styles.centeredView}
                    >
                        <View
                            style={styles.modalView}
                        >
                            <Text
                                style={styles.headline}
                            >
                                Neue Höhe hinzufügen
                            </Text>
                            <Text>
                                Messe deine Pflanze und füge einen neuen Wachstums Eintrag hinzu.
                            </Text>
                            <View
                                style={styles.row}
                            >
                                <View
                                    style={styles.inputView}
                                >
                                    <Input
                                        value={plantHeight}
                                        onChange={setPlantHeight}
                                        placeholder="Höhe in cm"
                                        isSecretField={false}
                                        hasError={plantHeightError}
                                        style={styles.input}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.iconBtn}
                                    onPress={async () => {
                                        if(validateDiaryEntry(plantHeight)) 
                                        {
                                            await submitDairyEntry(plantHeight);
                                        }
                                    }}
                                >
                                    <FontAwesome name="save" size={30} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View
                                style={styles.btnView}
                            >
                                <Button 
                                    text="zurück" 
                                    action={() => {
                                        setDairyModalVisible(!dairyModalVisible);
                                    }} 
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <Text
                style={styles.headline}
            >
                Tagebuch
            </Text>
            <Text>
                Hier kannst du das Wachstum deiner Pflanzen festhalten.
            </Text>
            <View>
                <Text
                    style={styles.subHeadline}
                >
                    Wachstum
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setDairyModalVisible(!dairyModalVisible);
                    }}
                >
                    <Text
                        style={styles.underline}
                    >
                        Wachstumspunkte hinzufügen
                    </Text>
                </TouchableOpacity>
                <View
                    style={styles.alignCenter}
                >
                    <LineChart
                        data={chartData}
                        width={chartWidth}
                        height={220}
                        formatYLabel={(y) => {
                            return Math.round(y);
                        }}
                        chartConfig={chartConfig}
                        style={styles.chart}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chart: {
        borderRadius: 15,
        marginTop: 10
    },
    underline: {
        textDecorationLine: 'underline'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center"
    },
    input: {
        width: '50%'
    },
    row: {
        flexDirection: 'row'
    },
    alignCenter: {
        alignItems: 'center'
    },
    iconBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 10,
        marginTop: 12
    },
    inputView: {
        alignItems: 'center',
        width: '80%'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2
    },
    btnView: {
        marginTop: 10,
        alignItems: 'center'
    },
    container: {
        padding: 15
    },
    headline: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subHeadline: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold'
    }
});

export default Diary;