import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity
} from 'react-native';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';
import {
    Button,
    Header,
    Card,
    LabelCheckbox
} from '../../components';

const Settings = ({ navigation }) => {
    const [pourNotificationsChecked, setPourNotificationsChecked] = React.useState(true);
    const [fertilizeNotificationsChecked, setFertilizeNotificationsChecked] = React.useState(true);

    // days checked
    const [monCheckbox, setMonCheckbox] = React.useState(false);
    const [tueCheckbox, setTueCheckbox] = React.useState(false);
    const [wedCheckbox, setWedCheckbox] = React.useState(false);
    const [thuCheckbox, setThuCheckbox] = React.useState(false);
    const [friCheckbox, setFriCheckbox] = React.useState(true);
    const [satCheckbox, setSatCheckbox] = React.useState(true);
    const [sunCheckbox, setSunCheckbox] = React.useState(true);

    const [dailyNotifications, setDailyNotifications] = React.useState(true);
    const [weeklyNotifications, setWeeklyNotifications] = React.useState(false);

    const fetchSettings = async () => {
        try 
        {
            const res = await axios.get(global.cfg.BASE_URL + '/settings');
            const settings = res.data;
    
            setPourNotificationsChecked(settings.pourNotifications);
            setFertilizeNotificationsChecked(settings.fertilizeNotifications);
            setMonCheckbox(settings.mondayNotifications);
            setTueCheckbox(settings.tuesdayNotifications);
            setWedCheckbox(settings.wednesdayNotifications);
            setThuCheckbox(settings.thursdayNotifications);
            setFriCheckbox(settings.fridayNotifications);
            setSatCheckbox(settings.saturdayNotifications);
            setSunCheckbox(settings.sundayNotifications);
            setDailyNotifications(settings.remindDaily);
            setWeeklyNotifications(settings.remindWeekly);
        }
        catch(err) 
        {
            console.error(err);
        }
    };

    const saveSettings = async () => {
        try 
        {
            const res = await axios.put(global.cfg.BASE_URL + '/settings', {
                pourNotifications: pourNotificationsChecked,
                fertilizeNotifications: fertilizeNotificationsChecked,
                mondayNotifications: monCheckbox,
                tuesdayNotifications: tueCheckbox,
                wednesdayNotifications: wedCheckbox,
                thursdayNotifications: thuCheckbox,
                fridayNotifications: friCheckbox,
                saturdayNotifications: satCheckbox,
                sundayNotifications: sunCheckbox,
                remindDaily: dailyNotifications,
                remindWeekly: weeklyNotifications,
            });
        }
        catch(err) 
        {
            console.error(err);
        }
    };

    React.useEffect(() => {
        navigation.addListener('focus', () => {
            fetchSettings();
        });
    }, []);

    const handleSignOut = async () => {
        try 
        {
            const res = await axios.get(global.cfg.BASE_URL + '/sign-out');
        }
        catch(err) 
        {
            console.error(err);
        }
    };

    return (
        <View>
            <Header 
                headline="Einstellungen"
            />
            <Card
                style={styles.card}
            >
                <Text
                    style={styles.settingsHeadline}
                >
                    Welche Benachrichtigungen möchtest du bekommen?
                </Text>
                <Text>
                    Du kannst hier Einstellen welche Art von Erinnerungen du bekommen möchtest.
                </Text>
                <LabelCheckbox 
                    value={pourNotificationsChecked}
                    onValueChange={setPourNotificationsChecked}
                    label="Gieß-Erinnerungen"
                    alignHorizontal={true}
                />
                <LabelCheckbox 
                    value={fertilizeNotificationsChecked}
                    onValueChange={setFertilizeNotificationsChecked}
                    label="Dünge-Erinnerungen"
                    alignHorizontal={true}
                />
                <Text
                    style={styles.settingsHeadline}
                >
                    Wann dürfen wir dich stören?
                </Text>
                <Text>
                    Wähle die Tage in der Woche an denen wir dich stören dürfen. (Work in Progress)
                </Text>
                <View
                    style={styles.dayRow}
                >
                    <LabelCheckbox 
                        value={monCheckbox}
                        onValueChange={setMonCheckbox}
                        label="Mo"
                    />
                    <LabelCheckbox 
                        value={tueCheckbox}
                        onValueChange={setTueCheckbox}
                        label="Di"
                    />
                    <LabelCheckbox 
                        value={wedCheckbox}
                        onValueChange={setWedCheckbox}
                        label="Mi"
                    />
                    <LabelCheckbox 
                        value={thuCheckbox}
                        onValueChange={setThuCheckbox}
                        label="Do"
                    />
                    <LabelCheckbox 
                        value={friCheckbox}
                        onValueChange={setFriCheckbox}
                        label="Fr"
                    />
                    <LabelCheckbox 
                        value={satCheckbox}
                        onValueChange={setSatCheckbox}
                        label="Sa"
                    />
                    <LabelCheckbox 
                        value={sunCheckbox}
                        onValueChange={setSunCheckbox}
                        label="So"
                    />
                </View>
                <View>
                    <Text
                        style={styles.settingsHeadline}
                    >
                        Wie oft dürfen wir dich stören?
                    </Text>
                    <Text>
                        Wähle hier wie oft du daran erinnert werden möchtest, zu prüfen ob deine Pflanzen Wasser benötigen.
                    </Text>
                    <LabelCheckbox 
                        value={dailyNotifications}
                        onValueChange={() =>{
                            setDailyNotifications(!dailyNotifications);
                            setWeeklyNotifications(!weeklyNotifications);
                        }}
                        label="jeden Tag erinnern"
                        alignHorizontal={true}
                    />
                    <LabelCheckbox 
                        value={weeklyNotifications}
                        onValueChange={() => {
                            setDailyNotifications(!dailyNotifications);
                            setWeeklyNotifications(!weeklyNotifications);
                        }}
                        label="wöchentlich erinnern"
                        alignHorizontal={true}
                    />
                </View>
                <View
                    style={styles.btnRow}
                >
                    <View>
                        <Text
                            style={styles.settingsHeadline}
                        >
                            Einstellungen speichern!
                        </Text>
                        <Text>
                            Nur ein klick.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.saveBtn}
                        onPress={() => {
                            saveSettings();
                        }}
                    >
                        <FontAwesome name="save" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                <View
                    style={styles.btnRow}
                >
                    <View>
                        <Text
                            style={styles.settingsHeadline}
                        >
                            Vom Account abmelden?
                        </Text>
                        <Text>
                            Wir hoffen das du bald zurück bist!
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.signOutBtn}
                        onPress={() => {
                            handleSignOut();

                            navigation.navigate('Home');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Welcome' }],
                            });
                        }}
                    >
                        <FontAwesome name="sign-out" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </Card>
        </View>
    );
};

export default Settings;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
    },
    dayRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    signOutBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 20
    },
    saveBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 10,
        marginTop: 20
    },
    btn: {
        backgroundColor: 'red',
        width: '60%'
    },
    dayCheckboxText: {
        flexDirection: 'row',
        marginTop: 3
    },
    intervalCheckboxText: {
        flexDirection: 'row',
        marginLeft: 10
    },
    settingsHeadline: {
        fontSize: 17,
        marginTop: 15,
        fontWeight: 'bold'
    }
});