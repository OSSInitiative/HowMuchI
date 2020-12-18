import React, { useContext } from 'react';
import {ROUTES} from '../config';

type ROUTES_Keys = keyof typeof ROUTES;
export type RouteType = typeof ROUTES[ROUTES_Keys];

export interface Services {

    navigate(route: RouteType, titleName?: string, queryParameters?: Record<string, string>);

}


export const ServicesContext = React.createContext<Services>(undefined as any);


export function useServices() : Services {
    return useContext(ServicesContext);
}