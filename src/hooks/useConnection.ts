import { useState, useEffect, useCallback } from 'react';
import { Connection } from '@solana/web3.js';
import {tkn} from '../utils/tkn';
import {network} from '../utils/network';
import {cluster} from '../utils/cluster';
import {provider} from '../utils/provider';
import {epbase} from '../utils/epbase';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useConnection = () => {
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const endpoint = `https://${epbase[0]}.${network}-${cluster[0]}.${provider[0]}.pro/${tkn[0]}`;
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [connection, setConnection] = useState<Connection | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const fetchConnection = useCallback(async () => {
        try{
            if (!endpoint) {return;}
            try {
                const connection = new Connection(endpoint, 'confirmed');
                setConnection(connection);
                await connection.getVersion();
                setIsConnected(true);
            } catch (error) {
                setError(error as Error);
                setIsConnected(false);
            }
        } catch(e){}
    }, [endpoint]);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {fetchConnection();}, [fetchConnection]);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return { endpoint, connection, isConnected, error };
};
