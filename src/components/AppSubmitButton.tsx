import React, { CSSProperties } from "react";
import { View, Text } from "react-native";
import { Icon, Button, getScaledValue, StyleSheet } from 'renative';


export interface AppSubmitButtonProps {

    styles?: CSSProperties,

    text: string;

}

const styles = StyleSheet.create({
    button: {
        borderRadius: getScaledValue(5),
        backgroundColor: '#ef6c0c',
        paddingHorizontal: getScaledValue(35),
        paddingVertical: getScaledValue(10),
    },
    buttonText: {
        fontSize: getScaledValue(20),
        color: 'white',
    }
});

export function AppSubmitButton(props: AppSubmitButtonProps) {

    return (
        // <Button
        //     style={props.styles ? [styles.button, props.styles] : styles.button}
        // >
        //     {props.text}
        // </Button>


        <Button
            //to={ROUTES.LOST}
            title={props.text}
            className="focusable"
            style={props.styles ? [styles.button, props.styles] : styles.button}
            textStyle={styles.buttonText}
            onPress={() => {
                
            }}
            onEnterPress={() => {
                
            }}
        />
    );
}
