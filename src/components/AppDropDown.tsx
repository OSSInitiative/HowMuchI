import React, { Component, CSSProperties } from "react";
import { Picker, View, Text } from "react-native";
import { Icon, getScaledValue, StyleSheet } from 'renative';
import Theme from '../config';

export interface ItemInfo {

    label: string;
    value: string;

}

export interface AppDropDownProps {

    styles?: CSSProperties,

    values?: (string | ItemInfo)[];
    defaultValue?: any;

    onValueChagne(value: string): void;

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        border: '2px solid #5d5d5d',
        borderRadius: getScaledValue(5),
        minHeight: getScaledValue(20),
        paddingVertical: getScaledValue(10),
        paddingHorizontal: getScaledValue(15),

        position: 'relative',

        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    },
    itemStyle: {
        fontSize: 10,
        fontFamily: "Roboto-Regular",
        color: "#007aff",
    },
    pickerStyle: {
        color: 'white',
        fontSize: getScaledValue(20),
        flexShrink: 1,
        flexGrow: 1,
        fontFamily: "Roboto-Regular",
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        margin: 0
    },
    pickerArrow: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        width: getScaledValue(50),
        height: '100%',
        backgroundColor: Theme.backgroundColor,

        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    pickerArrowText: {
        color: '#aaa',
        cursor: 'pointer',
    },
    textStyle: {
        fontSize: 14,
        fontFamily: "Roboto-Regular"
    }
});


export class AppDropDown extends Component<AppDropDownProps> {
    state = {
        selectedcat: this.props.defaultValue,
        category: this.props.values
    };

    async onValueChangeCat(value) {
        this.setState({ selectedcat: value });
    }

    render() {
        return (
            <View style={this.props.styles ? [styles.container, this.props.styles] : styles.container}>
                <Picker
                    style={styles.pickerStyle}
                    itemStyle={styles.itemStyle}
                    mode="dropdown"
                    selectedValue={this.state.selectedcat}
                    onValueChange={this.onValueChangeCat.bind(this)}
                >
                    {this.state.category.map((item, index) => {
                        if (typeof item === 'string') {
                            return (
                                <Picker.Item
                                    label={item}
                                    value={item}
                                    key={index}
                                />
                            );
                        } else {
                            return (
                                <Picker.Item
                                    label={item.label}
                                    value={item.value}
                                    key={index}
                                />
                            );
                        }
                    })}
                </Picker>
                <View style={styles.pickerArrow}>
                    <Text style={styles.pickerArrowText}>&#x25BC;</Text>
                </View>
            </View>
        );
    }
}