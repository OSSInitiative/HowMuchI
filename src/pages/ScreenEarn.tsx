import React, { Component, createRef } from 'react';
import { View, Text } from "react-native";
import { Icon, Button, getScaledValue, StyleSheet } from 'renative';
import { AppTextInput } from '../components/AppTextInput';
import { AppDropDown } from '../components/AppDropDown';
import { AppSubmitButton } from '../components/AppSubmitButton';
import { ServicesContext } from '../state/Services';
import { AppResult } from '../components/AppResult';

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
        //width: getScaledValue(400),
    },
    submitButton: {
        marginTop: getScaledValue(60),
    }
});

interface ScreenEarnState {

    showingResults: boolean;

    currency: string;

    firstCurrency: string;
    secondCurrency: string;

}


export class ScreenEarn extends Component<ScreenEarnProps, ScreenEarnState> {

    static contextType = ServicesContext;


    constructor(props: ScreenEarnProps) {
        super(props);

        this.state = {
            showingResults: false,

            currency: 'USC',
            firstCurrency: '0',
            secondCurrency: '0',
        };
    }



    calculate() {
        this.setState(prev => ({
            ...prev,
            showingResults: !prev.showingResults
        }))
    }



    render() {
        const Body = this.state.showingResults
            ? this.renderResult
            : this.renderCalculator;

        return (
            <View style={styles.container}>

                <Body />

                <AppSubmitButton
                    styles={styles.submitButton}
                    text={this.state.showingResults ? 'Recalculate' : 'Calculate'}
                    onSubmit={() => this.calculate()}
                />

            </View>
        );
    }


    renderCalculator() {
        return (
            <View>
                <Text style={styles.titleText}>How Much I Earn</Text>

                <Text style={styles.inputTitle}>Currency</Text>
                <AppDropDown
                    styles={styles.input}
                    values={[
                        'BTC-USD',
                        'test'
                    ]}
                    defaultValue='BTC-USD'
                    onValueChagne={(text) => this.setState({
                        currency: text
                    })}
                />

                <Text></Text>

                <Text style={styles.inputTitle}>Sold Price</Text>
                <AppTextInput
                    text='0'
                    suffix='USD'
                    styles={styles.input}
                    onValueChange={(text) => this.setState({
                        firstCurrency: text
                    })}
                />

                <Text style={styles.inputTitle}>How much you sold?</Text>
                <AppTextInput
                    text='0.0'
                    suffix='BTC'
                    styles={styles.input}
                    onValueChange={(text) => this.setState({
                        secondCurrency: text
                    })}
                />
            </View>
        )
    }

    renderResult() {
        return (
            <AppResult
                title='You Earn'
                value1='$33.33'
                value2='0.0018 BTC'
                txt1='You can now buy'
                txt2='0.0139 BTC'
                showClose={false}
                close={() => this.setState({
                    showingResults: false
                })}
            />
        );
    }
}