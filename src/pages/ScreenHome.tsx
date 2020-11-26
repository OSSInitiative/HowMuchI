import React, { Component } from 'react';
import { View, Text } from "react-native";

export interface ScreenHomeProps {

    path: string;

}

export class ScreenHome extends Component<ScreenHomeProps> {
    
    render() {
        return (
            <View>
                <Text>
                    test
                </Text>
            </View>
        );
    }
};