import React from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    FlatList
} from 'react-native';

const NormalFlatList = ({navigation, plants}) => {
    return (
        <FlatList 
            data={plants}
            contentContainerStyle={{
                padding: 20,
                paddingBottom: 100
            }}
            renderItem={({item, index}) => {
                const openDetails = () => {
                    navigation.navigate('Details', {
                        plantId: item.id,
                        plantName: item.name,
                        plantType: item.type,
                        plantHeight: item.height,
                        plantImage: global.cfg.BASE_URL + '/uploads/' + item.imageRef,
                        plantTypeInfo: item.parent
                    });
                };
                
                return (
                    <TouchableOpacity
                        onPress={openDetails}
                        onLongPress={openDetails}
                    >
                        <View
                            style={[
                                styles.view
                            ]}
                        >
                            <Image 
                                source={{ uri: global.cfg.BASE_URL + '/uploads/' + item.imageRef }}
                                style={styles.image}
                            />
                            <View>
                                <Text
                                    style={styles.name}
                                >
                                    {item.name.length == 0 ? item.type : item.name}
                                </Text>
                                <Text
                                    style={styles.type}
                                >
                                    {item.type}
                                </Text>
                            </View>
                        </View> 
                    </TouchableOpacity>             
                )                 
            }}
            keyExtractor={item => item.id}
            style={{
                marginVertical: 10,
            }}
            scrollEnabled={true}
        />
    );
};

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 20,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: .3,
        shadowRadius: 20,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 70,
        marginRight: 10
    },
    name: {
        fontSize: 20,
        fontWeight: '700'
    },
    type: {
        fontSize: 16,
        opacity: .7,
        paddingRight: 40
    },
});

export default NormalFlatList;