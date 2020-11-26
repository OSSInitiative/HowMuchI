import React, { useEffect, Component, ReactNode, ComponentClass } from 'react';
import { View, Text } from 'react-native';
import { Router, navigate, useLocation } from '@reach/router';
import Theme from '../config';
import Menu from '../components/Menu';
import { ScreenHome } from '../pages/ScreenHome';
import { ScreenLost } from '../pages/ScreenLost';
import { ScreenEarn } from '../pages/ScreenEarn';
import { ServicesContext, Services } from '../state/Services';

class ServicesImpl implements Services {

}

const svc = new ServicesImpl();

interface AppProps {

}

interface AppState {
    currentRoute: string;
}

export default class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);

        this.hookRoute = this.hookRoute.bind(this);

        this.state = {
            currentRoute: '/'
        };
    }

    hookRoute(loc: Location) {
        if (this.state.currentRoute != loc.pathname) {
            setTimeout(() => {
                this.setState({
                    currentRoute: loc.pathname
                });
            }, 0);
        }
    }

    render() {
        return (
            <ServicesContext.Provider value={svc}>
                <View style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: Theme.backgroundColor,
                }}>
                    <Menu focusKey="menu" navigate={navigate} currentRoute={this.state.currentRoute} />

                    <View>
                        <Router>
                            <HOCRouterHook path="/" component={ScreenHome} hookLocation={this.hookRoute} />
                            <HOCRouterHook path="/earn" component={ScreenEarn} hookLocation={this.hookRoute} />
                            <HOCRouterHook path="/lost" component={ScreenLost} hookLocation={this.hookRoute} />
                        </Router>
                    </View>
                </View>
            </ServicesContext.Provider>
        );
    }
};

function HOCRouterHook(props: {
    path: string,
    component: ComponentClass,
    hookLocation: (loc: Location) => void;
}) {
    const loc = useLocation();

    props.hookLocation(loc);

    const Component = props.component;
    return (
        <Component />
    );
}