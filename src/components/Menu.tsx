/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { Icon, Button, getScaledValue, useNavigate, useOpenDrawer, StyleSheet } from 'renative';
import { initNavigation, withFocusable } from '@noriginmedia/react-spatial-navigation';
import Theme, { themeStyles, hasHorizontalMenu, hasWebFocusableUI, ROUTES, ICON_LOGO } from '../config';

if (hasWebFocusableUI) {
    initNavigation({
        debug: false,
        visualDebug: false,
        nativeMode: false
    });
}

export const DrawerButton = (props) => {
    const openDrawer = useOpenDrawer(props);
    return (
        <Icon
            iconFont="ionicons"
            iconName="md-menu"
            iconColor={Theme.color3}
            size={Theme.iconSize}
            style={themeStyles.icon}
            onPress={() => {
                openDrawer('Drawer');
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: getScaledValue(hasHorizontalMenu ? 40 : 40),
        width: Theme.menuWidth,
        height: Theme.menuHeight,
        backgroundColor: Theme.navBackColor,
        alignItems: 'flex-start',
        borderRightWidth: getScaledValue(hasHorizontalMenu ? 0 : 5),
        borderBottomWidth: getScaledValue(hasHorizontalMenu ? 5 : 0),
        borderColor: Theme.navBottomBorderColor,
        flexDirection: hasHorizontalMenu ? 'row' : 'column'
    },
    navContainer: {
        paddingLeft: getScaledValue(hasHorizontalMenu ? 40 : 40),
        flexGrow: 1,
        flexDirection: hasHorizontalMenu ? 'row' : 'column',
        alignItems: 'center',
        height: '100%',
    },
    howMuchIText: {
        fontFamily: Theme.primaryFontFamily,
        fontSize: getScaledValue(20),
        color: '#e3e3e3',
        fontWeight: 'bold',
        marginRight: getScaledValue(20),
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginLeft: hasHorizontalMenu ? getScaledValue(20) : 0,
        marginTop: hasHorizontalMenu ? 0 : getScaledValue(20),
        maxWidth: getScaledValue(400),
        minWidth: getScaledValue(50),
        borderWidth: 0,
    },
    buttonText: {
        fontFamily: Theme.primaryFontFamily,
        color: '#747474',
        fontWeight: 'bold',
        fontSize: getScaledValue(20)
    },
    buttonActiveText: {
        fontFamily: Theme.primaryFontFamily,
        color: '#ca6012',
        fontWeight: 'bold',
        fontSize: getScaledValue(20)
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    logoImage: {
        alignSelf: 'center',
    },
});

const Menu = (props) => {
    const { setFocus } = props;
    const navigate = useNavigate(props);
    if (hasWebFocusableUI) {
        useEffect(() => {
            setFocus();
        }, []);
    }

    const active = ROUTES.EARN;

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={ICON_LOGO}
                    style={styles.logoImage}
                    resizeMode={"center"}
                />
            </View>

            <View style={styles.navContainer}>
                <Text style={styles.howMuchIText}>
                    How Much I
                </Text>

                <Button
                    //to={ROUTES.LOST}
                    title="Lost"
                    className="focusable"
                    style={styles.button}
                    textStyle={active == ROUTES.LOST ? styles.buttonActiveText : styles.buttonText}
                    onPress={() => {
                        navigate(ROUTES.LOST, '/[slug]');
                    }}
                    onEnterPress={() => {
                        navigate(ROUTES.LOST, '/[slug]');
                    }}
                />
                <Button
                    title="Earn"
                    className="focusable"
                    style={styles.button}
                    textStyle={active == ROUTES.EARN ? styles.buttonActiveText : styles.buttonText}
                    onPress={() => {
                        navigate(ROUTES.EARN, '/[slug]');
                    }}
                    onEnterPress={() => {
                        navigate(ROUTES.EARN, '/[slug]');
                    }}
                />
            </View>

            {/* <Button
                // to={ROUTES.MODAL}
                title="My Modal"
                iconFont="ionicons"
                className="focusable"
                iconName="ios-albums"
                iconColor={Theme.color3}
                iconSize={Theme.iconSize}
                style={styles.button}
                textStyle={styles.buttonText}
                onPress={() => {
                    navigate(ROUTES.MODAL, '/[slug]');
                }}
                onEnterPress={() => {
                    navigate(ROUTES.MODAL, '/[slug]');
                }}
            /> */}
        </View>
    );
};

export default (hasWebFocusableUI ? withFocusable()(Menu) : Menu);
