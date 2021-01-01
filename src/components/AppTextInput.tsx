import React, { CSSProperties } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Icon, getScaledValue, StyleSheet } from 'renative';

export interface TextInputProps {

    styles?: CSSProperties,

    text: string;

    suffix?: string;

    onValueChange?(value: string): void;

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        border: '2px solid #5d5d5d',
        borderRadius: getScaledValue(5),
        minHeight: getScaledValue(20),
        paddingVertical: getScaledValue(10),
        paddingHorizontal: getScaledValue(15),
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    suffix: {
        color: '#aaa',
        fontSize: getScaledValue(20),
    },
    textBox: {
        color: 'white',
        fontSize: getScaledValue(20),
        flexGrow: 1,
        marginRight: getScaledValue(10),
    }
});

function onChangeText(this: TextInputProps, text: string) {
    if (this.onValueChange) {
        this.onValueChange(text);
    }
}

export function AppTextInput(props: TextInputProps) {

    return (
        <View style={props.styles ? [styles.container, props.styles] : styles.container}>
            <TextInput
                style={styles.textBox}
                defaultValue={props.text}
                onChangeText={onChangeText.bind(props)}
            />
            {props.suffix && <Text style={styles.suffix}>{props.suffix}</Text>}
        </View>
    );
}