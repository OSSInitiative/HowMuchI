import React, { useEffect, Component, ReactNode, ComponentClass } from 'react';
import { View, Text } from 'react-native';
import { Router, navigate, useLocation } from '@reach/router';
import Theme, { ROUTES } from '../config';
import Menu from '../components/Menu';
import { ScreenHome } from '../pages/ScreenHome';
import { ScreenLost } from '../pages/ScreenLost';
import { ScreenEarn } from '../pages/ScreenEarn';
import { ServicesContext, Services } from '../state/Services';
import queryString from 'query-string';

class ServicesImpl implements Services {

    private app: App;

    constructor(app: App) {
        this.app = app;
    }

    navigate(route: string, titleName?: string, queryParameters?: Record<string, string>) {

        if (document) {
            let searchValue = `?page=${route}`;
            if (queryParameters) {
                for (const key in queryParameters) {
                    if (queryParameters.hasOwnProperty(key)) {
                        let value = queryParameters[key];

                        if (value) {
                            if (searchValue.startsWith('?')) {
                                searchValue = searchValue.substring(1);
                            }

                            searchValue += '&' + value;
                        }
                    }
                }
            }

            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + searchValue;
            window.history.pushState(
                { path: newUrl },
                'HowMuchI - ' + titleName,
                newUrl
            );
            if (titleName) {
                document.title = 'HowMuchI - ' + titleName;
            } else {
                document.title = 'HowMuchI';
            }
        }

        //document.location.search['page'] = route;
        this.app.setState({
            currentRoute: route
        });
    }

}

interface AppProps {

}

interface AppState {

    currentRoute: string;

    services: ServicesImpl;

}

export default class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);


        const queryParameters = queryString.parse(document.location.search);

        const pg = queryParameters.page ?? queryParameters['?page'] ?? ROUTES.HOME;

        this.state = {
            currentRoute: pg,
            services: new ServicesImpl(this)
        };
    }

    render() {
        let Component;
        let page;

        let route = this.state.currentRoute.toLowerCase();
        if (route.startsWith('/')) {
            route = route.substring(1);
        }

        switch (route) {
            case 'earn': {
                Component = ScreenEarn;
                page = ROUTES.EARN;
                break;
            }
            case 'lost': {
                Component = ScreenLost;
                page = ROUTES.LOST;
                break;
            }
            default: {
                Component = ScreenHome;
                page = ROUTES.HOME;
                break;
            }
        }


        const queryParameters = queryString.parse(document.location.search);


        return (
            <ServicesContext.Provider value={this.state.services}>
                <View style={{
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: Theme.backgroundColor,
                }}>
                    <Menu focusKey="menu" navigate={navigate} currentRoute={page} />

                    <View>

                        <Component
                            queryParameters
                        />
                    </View>
                </View>
            </ServicesContext.Provider>
        );
    }
};