import React from 'react';
import { View, Text } from "react-native";

export interface ScreenLostProps {

    path: string;

}

export function ScreenLost(props: ScreenLostProps) {

    return (
        <View>
            <Text>Lost</Text>
        </View>
    );
}