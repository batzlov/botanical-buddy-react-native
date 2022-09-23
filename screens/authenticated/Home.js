import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text 
} from 'react-native';
import axios from 'axios';
import {
    Card,
    Header,
    Calendar
} from '../../components';
import {
    EVENT_TYPES,
    EVENT_TYPE_COLORS
} from '../../constants/enums';

const Home = ({navigation}) => {
    const [events, setEvents] = React.useState([]);
    const [eventsToday, setEventsToday] = React.useState([]);

    const fetchEvents = async () => {
        try 
        {
            const res = await axios.get(global.cfg.BASE_URL + '/events');

            const filteredEvents = res.data.events.filter((event) => {
                if(event.date == res.data.todayAsString) 
                {
                    return event;
                }
            });

            setEvents(res.data.events);
            setEventsToday(filteredEvents);
        }
        catch(err) 
        {
            console.log(err);
        }
    }; 

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            fetchEvents();
        });

        return () => {
            setEvents({});
        };
    }, []);

    const renderEventsToday = () => {
        if(eventsToday.length == 0) 
        {
            return (
                <Text>
                    Sieh dir unten im Kalender an was du für diese Wo
                    che zutun hast!
                </Text>
            );
        }
        else 
        {
            const items = [];

            eventsToday.forEach((item) => {
                items.push(
                    <View
                        style={styles.row}
                        key={Math.random()}
                    >
                        <View 
                            style={item.type == EVENT_TYPES.POUR ? styles.pourDot : styles.fertilizeDot}
                        />
                        <Text>{item.details}</Text>
                    </View>
                );
            });

            return (
                <Text
                    style={styles.overviewContent}
                >
                    {items}
                </Text>
            );
        }
    };

    return (
        <View>
            <Header 
                headline="Hallo Robert!"
                subHeadline="Hast du dir heute schon angesehen wie es deinen Pflanzen geht?"
            />
            <Card 
                style={styles.card}
            >
                <Text
                    style={styles.overviewHeadline}
                >
                    Deine Aufgaben
                </Text>
                {renderEventsToday()}
            </Card>
            <Card 
                style={styles.card}
            >
                <Text
                    style={styles.overviewHeadline}
                >
                    Monatsübersicht
                </Text>
                <Text>
                    Legende:
                </Text>
                <View
                    style={styles.legendRow}
                >
                    <View
                        style={[styles.legendColor, {
                            backgroundColor: EVENT_TYPE_COLORS.POUR
                        }]}
                    />
                    <Text
                        style={styles.legendText}
                    >
                        Gießen
                    </Text>
                    <View
                        style={[styles.legendColor, {
                            backgroundColor: EVENT_TYPE_COLORS.FERTILIZE,
                            marginLeft: 10
                        }]}
                    />
                    <Text
                        style={styles.legendText}
                    >
                        Düngen
                    </Text>
                </View>
                {/* months ranges from 0 .. 11 */}
                <Calendar 
                    month={1}
                    year={2022} 
                    events={events}
                />
            </Card>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center'
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    legendColor: {
        height: 20,
        width: 20,
        borderRadius: 5
    },
    legendText: {
        marginLeft: 10,
    },
    column: {
        width: 40,
        height: 40,
        textAlign: 'left',
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    overview: {
        backgroundColor: '#fff',
        marginVertical: 5,
        padding: 15,
    },
    card: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 10
    },
    overviewHeadline: {
        fontSize: 16,
        fontWeight: '600'
    },
    overviewContent: {
        paddingHorizontal: 15
    },
    pourDot: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: EVENT_TYPE_COLORS.POUR,
        marginRight: 10
    },
    fertilizeDot: {
        height: 20,
        width: 20,
        borderRadius: 50,
        backgroundColor: EVENT_TYPE_COLORS.FERTILIZE,
        marginRight: 10
    },
});
