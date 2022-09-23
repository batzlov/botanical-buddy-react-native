import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Checkbox from 'expo-checkbox';

const LabelCheckbox = ({value, onValueChange, label, alignHorizontal}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                onValueChange(!value)
            }}
            activeOpacity={1}
        >
        <View
            style={alignHorizontal ? styles.row : styles.column}
        >
                <Checkbox 
                    value={value}
                    onValueChange={onValueChange}
                    style={alignHorizontal ? styles.horizontalCheckbox : styles.verticalCheckbox}
                    color={value ? '#00695C' : undefined}
                />
                <Text>
                    {label}
                </Text>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    row: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {

    },
    horizontalCheckbox: {
        marginRight: 10
    },
    verticalCheckbox: {
        marginBottom: 5
    },
});

export default LabelCheckbox;
