import React from 'react';
import { View, Text } from "react-native";

export interface ScreenHomeProps {

    path: string;

}

export function ScreenHome (props: ScreenHomeProps) {
    return (
        <View>
            <Text>
                test
            </Text>
        </View>
    );
};