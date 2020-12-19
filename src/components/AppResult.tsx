import React from 'react';
import { View, Text } from "react-native";
import { Icon, Button, getScaledValue, StyleSheet } from 'renative';
import { AppSubmitButton } from './AppSubmitButton';


export interface AppResultProps {

    title: string;

    value1: string;
    value2: string;


    txt1: string;
    txt2: string;

    showClose: boolean;
    close(): void;

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        color: 'white',
        fontSize: getScaledValue(60),
        marginTop: getScaledValue(70),
        marginBottom: getScaledValue(10),
    },
    value1: {
        color: '#2adb7c',
        fontSize: getScaledValue(40),
        marginTop: getScaledValue(40),
    },
    value2: {
        color: '#2adb7c',
        fontSize: getScaledValue(15),
        marginTop: getScaledValue(15),
        marginBottom: getScaledValue(10),
    },
    txt1: {
        color: '#abacad',
        fontSize: getScaledValue(25),
        marginTop: getScaledValue(40),
        marginBottom: getScaledValue(10),
    },
    txt2: {
        color: '#abacad',
        fontSize: getScaledValue(25),
        marginTop: getScaledValue(10),
        marginBottom: getScaledValue(10),
    },
    
    submitButton: {
        marginTop: getScaledValue(60),
    }
});


export function AppResult(props: AppResultProps) {


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>{props.title}</Text>
            </View>

            <View>
                <Text style={styles.value1}>{props.value1}</Text>
                <Text style={styles.value2}>{props.value2}</Text>
            </View>

            <View>
                <Text style={styles.txt1}>{props.txt1}</Text>
                <Text style={styles.txt2}>{props.txt2}</Text>
            </View>

            {props.showClose &&
                <View>
                    <AppSubmitButton
                        text='Recalculate'
                        onSubmit={() => {
                            props.close();
                        }}
                    />
                </View>
            }
        </View>
    );
}
