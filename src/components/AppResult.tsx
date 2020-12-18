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
    inputTitle: {
        color: '#999',
        fontSize: getScaledValue(15),
        marginTop: getScaledValue(40),
        marginBottom: getScaledValue(10),
    },
    input: {
        width: getScaledValue(400),
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
                <Text>{props.value1}</Text>
                <Text>{props.value2}</Text>
            </View>

            <View>
                <Text>{props.txt1}</Text>
                <Text>{props.txt2}</Text>
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
