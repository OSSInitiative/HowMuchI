import React, { Component, createRef } from 'react';
import { View, Text } from "react-native";
import { Icon, Button, getScaledValue, StyleSheet } from 'renative';
import { AppTextInput } from '../components/AppTextInput';
import { AppDropDown } from '../components/AppDropDown';
import { AppSubmitButton } from '../components/AppSubmitButton';
import { ServicesContext, useServices } from '../state/Services';
import { AppResult } from '../components/AppResult';
import { CurrencyInfo, getCurrencyPermutations } from '../models/CurrencyInfo';
import { ICurrencyService } from '../services/CurrencyService';



type QueryParametersSchema = {

    action: 'showResult' | any;

    currency: string;
    v1: string;
    v2: string;

};


export interface ScreenEarnProps {

    path: string;


    variables: QueryParametersSchema;

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
        marginBottom: getScaledValue(60),
    },
    inputTitle: {
        color: '#999',
        fontSize: getScaledValue(15),
        marginBottom: getScaledValue(10),
    },
    item: {
        height: getScaledValue(85),
        //backgroundColor: 'red',
    },
    separator: {
        height: getScaledValue(50),
        minHeight: getScaledValue(50),
    },
    exchangeInfoView: {
    },
    exchangeInfo: {
        color: '#999',
        fontSize: getScaledValue(15),
        marginTop: getScaledValue(10),
        //marginBottom: getScaledValue(10),
        marginLeft: getScaledValue(20),
        textAlign: 'left'
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

    currencies: CurrencyInfo[];

    currency: string;

    firstCurrency: string;
    secondCurrency: string;



    earn: number;

    currentWorth: number;

}

export class ScreenEarn extends Component<ScreenEarnProps, ScreenEarnState> {

    static contextType = ServicesContext;

    private currencyService: ICurrencyService;


    constructor(props: ScreenEarnProps) {
        super(props);

        this.renderCalculator = this.renderCalculator.bind(this);
        this.renderResult = this.renderResult.bind(this);

        this.state = {
            showingResults: props.variables.action === 'showResult',

            currencies: [],

            currency: props.variables.currency || 'USD',
            firstCurrency: props.variables.v1,
            secondCurrency: props.variables.v2,

            currentWorth: 0,
            earn: 0,

            ...props.variables
        };

    }


    componentDidMount() {

        this.currencyService = this.context.getCurrencyService();

        const abort = new AbortController();

        const liveObservable = this.currencyService.getLiveCurrencyInfo(abort.signal);

        liveObservable.subscribe(currencies => {
            this.setState({
                currencies: currencies
            });
        });

    }


    calculate() {

        const [from, to] = this.parseCurrencyValue();

        const toPrice = this.currencyService.getExchangeRate(from, to, 1);

        const fromValue = parseFloat(this.state.firstCurrency);
        const toValue = parseFloat(this.state.secondCurrency);

        const earn = (toPrice - toValue) * fromValue;
        const currentWorth = fromValue - ((fromValue * toValue) / toPrice);

        const state = {

            earn,
            currentWorth,

            showingResults: !this.state.showingResults,


        } as Partial<ScreenEarnState>;

        this.context.updateStateVariables(state);

        this.setState(prev => ({
            ...prev,
            ...state
        }));
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

    parseCurrencyValue(): [from: string, to: string] {
        if (!this.state.currency) {
            return ['BTC', 'USD'];
        }

        const parts = this.state.currency.split('-');

        if (parts.length != 2) {
            return ['BTC', 'USD'];
        }

        return [parts[0], parts[1]];
    }

    renderCalculator() {

        const [from, to] = this.parseCurrencyValue();

        return (
            <View>
                <Text style={styles.titleText}>How Much I Earn</Text>

                <View style={styles.item}>
                    <Text style={styles.inputTitle}>Currency</Text>
                    <AppDropDown
                        styles={styles.input}
                        values={
                            (
                                this.state.currencies &&
                                this.state.currencies.length > 1 &&
                                getCurrencyPermutations(this.state.currencies) ||
                                ['INVALID']
                            )
                        }
                        defaultValue='BTC-USD'
                        onValueChange={(text) => this.setState({
                            currency: text
                        }, () => console.log('changed!'))}
                    />
                </View>


                <View style={styles.separator}>
                    <Text style={styles.exchangeInfo}>
                        {
                            this.currencyService && ('Price:  1 ' + from + ' is ' + this.currencyService.getExchangeRate(from, to, 1) + ' ' + to)
                        }
                    </Text>
                </View>


                <View style={styles.item}>
                    <Text style={styles.inputTitle}>Sold Price</Text>
                    <AppTextInput
                        text={this.state.currencies.find(c => c.code == to)?.format ?? '0'}
                        suffix={to}
                        styles={styles.input}
                        onValueChange={(text) => this.setState({
                            firstCurrency: text
                        })}
                    />
                </View>

                <View style={styles.separator} />

                <View style={styles.item}>
                    <Text style={styles.inputTitle}>How much you sold?</Text>
                    <AppTextInput
                        text={this.state.currencies.find(c => c.code == from)?.format ?? '0'}
                        suffix={from}
                        styles={styles.input}
                        onValueChange={(text) => this.setState({
                            secondCurrency: text
                        })}
                    />
                </View>
            </View>
        )
    }

    renderResult() {
        return (
            <AppResult
                title='You Earn'
                value1={this.state.firstCurrency}
                value2={this.state.secondCurrency}
                txt1='You can now buy'
                txt2={(this.state.currentWorth || 0).toString()}
                showClose={false}
                close={() => this.setState({
                    showingResults: false
                })}
            />
        );
    }
}