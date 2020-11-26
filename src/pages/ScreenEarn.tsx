import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Icon, Button, getScaledValue, StyleSheet } from 'renative';
import { AppTextInput } from '../components/AppTextInput';
import { AppDropDown } from '../components/AppDropDown';
import { AppSubmitButton } from '../components/AppSubmitButton';
import { ServicesContext } from '../state/Services';

export interface ScreenEarnProps {

    path: string;
    
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

export class ScreenEarn extends Component<ScreenEarnProps> {

    static contextType = ServicesContext;

    constructor(props: ScreenEarnProps) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>How Much I Earn</Text>

                <Text style={styles.inputTitle}>Currency</Text>
                <AppDropDown
                    styles={styles.input}
                    values={[
                        'BTC-USD',
                        'test'
                    ]}
                    defaultValue='BTC-USD'
                />

                <Text></Text>

                <Text style={styles.inputTitle}>Sold Price</Text>
                <AppTextInput
                    text='0'
                    suffix='USD'
                    styles={styles.input}
                    onValueChange={(text) => {

                    }}
                />

                <Text style={styles.inputTitle}>How much you sold?</Text>
                <AppTextInput
                    text='0.0'
                    suffix='BTC'
                    styles={styles.input}
                    onValueChange={(text) => {

                    }}
                />

                <AppSubmitButton
                    styles={styles.submitButton}
                    text='Calculate'
                />

            </View>
        );
    }
}