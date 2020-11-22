import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Router, navigate } from '@reach/router';
import Menu from '../components/Menu';
import { ScreenHome } from '../pages/ScreenHome';
import { ScreenLost } from '../pages/ScreenLost';
import { ScreenEarn } from '../pages/ScreenEarn';

const App = () => {
    return (
        <View style={{
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#0E1317',
        }}>
            <Menu focusKey="menu" navigate={navigate} />
    
            <View>
                <Router>
                    <ScreenHome path="/" />
                    <ScreenEarn path="/earn" />
                    <ScreenLost path="/lost" />
                </Router>
            </View>
        </View>
    );
};

export default App;
