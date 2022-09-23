import React from 'react';
import { 
    StyleSheet,
    View, 
    Text, 
} from 'react-native';
import axios from 'axios';
import {
    Header,
    Card,
    Button
} from '../../components';
  
const Test = () => {
    const [requestDuration, setRequestDuration] = React.useState(0);

    const measureRequestTime = async () => {
        try {
            var startTime = new Date();
            const res = await axios.get(global.cfg.BASE_URL + "/plants", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + global.token,
                }
            });
            var endTime = new Date();

            return endTime - startTime;
        } catch(err) {
            console.log(err);
            return 0;
        }
    }; 

    return (
        <View
            style={styles.container}
        >
            <Header 
                headline="Tests & co"
            />
            <Card
                style={styles.card}
            >
                <Text
                    style={styles.testText}
                >
                    Der Request hat {requestDuration}ms gedauert. 
                </Text>
                <View
                    style={styles.btnContainer}
                >
                    <Button 
                        text="Request starten" 
                        action={async () => {
                            var measuredTime = await measureRequestTime();
                            setRequestDuration(measuredTime);
                        }}
                    />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    testText: {
        fontSize: 16
    },
    btnContainer: {
        marginTop: 5,
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'red',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '95%'
    },
    errorMsg: {
        marginLeft: 15,
        marginTop: -7,
        color: 'red'
    }
});

export default Test;
