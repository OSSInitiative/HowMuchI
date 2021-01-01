import React, { useContext } from 'react';
import {ROUTES} from '../config';
import { CurrencyInfo } from '../models/CurrencyInfo';
import { ICurrencyService } from '../services/CurrencyService';

type ROUTES_Keys = keyof typeof ROUTES;
export type RouteType = typeof ROUTES[ROUTES_Keys];

export interface Services {

    navigate(route: RouteType, titleName?: string, variables?: Record<string, string>);

    updateStateVariables(variables: Record<string, string>);

    getCurrencyService(): ICurrencyService;

}


export const ServicesContext = React.createContext<Services>(undefined as any);


export function useServices() : Services {
    return useContext(ServicesContext);
}