import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { dbConfig } from './dbConfig';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useBatchdata = () => {
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [presaleGlobals, setPresaleGlobals] = useState({
        currentBatchID: '',
        nextBatchID: '',
        presaleEndedTimestamp: false,
        maxTokensForPresale: 0,
        minBuyVal: 0,
        maxBuyVal: 0,
        minTolerance: 0,
        maxTolerance: 0,
        maxTokensForReferral: 0,
        referrerPercentage: 5,
        affiliatePercentage: 5,
        reAffiliatePercentage: 5,
    });
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [currentBatchData, setCurrentBatchData] = useState({
        currPrice: 0,
        currTokensLeftInBatch: 0,
        currEndTimestamp: 0,
    });
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [nextBatchData, setNextBatchData] = useState({
        nextPrice: 0,
        nextTokensLeftInBatch: 0,
        nextEndTimestamp: 0,
    });
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [batchMap, setBatchMap] = useState({}); 
    const [loading, setLoading] = useState(true);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        try{
            const fetchBatchData = async () => {
                //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                try {
                    const dbConfigs = await dbConfig();
                    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    let app;
                    if (!getApps().length) {
                        app = initializeApp(dbConfigs);
                    } else {
                        app = getApps()[0];
                    }
                    const db = getFirestore(app);
                    const presaleGlobalsDoc = doc(db, "bemeowPresale", "db_presaleGlobals");
                    const presaleGlobalsSnapshot = await getDoc(presaleGlobalsDoc);
                    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    if (presaleGlobalsSnapshot.exists()) {
                        const globalsData = presaleGlobalsSnapshot.data();
                        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        setPresaleGlobals({
                            currentBatchID: globalsData.currBatchID,
                            nextBatchID: globalsData.nextBatchID,
                            presaleEndedTimestamp: globalsData.presaleEndedTimestamp,
                            maxTokensForPresale: globalsData.maxTokensForPresale,
                            minBuyVal: globalsData.minMaxBuyVal[0],
                            maxBuyVal: globalsData.minMaxBuyVal[1],
                            minTolerance: globalsData.minMaxTolerance[0],
                            maxTolerance: globalsData.minMaxTolerance[1],
                            maxTokensForReferral: globalsData.maxTokensForReferral,
                            referrerPercentage: globalsData.referrerPercentage,
                            affiliatePercentage: globalsData.affiliatePercentage,
                            reAffiliatePercentage: globalsData.reAffiliatePercentage,
                        });
                        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        const presaleBatchMapDoc = doc(db, "bemeowPresale", "db_presaleBatchMap");
                        const batchMapSnapshot = await getDoc(presaleBatchMapDoc);
                        const currID = String(globalsData.currBatchID);
                        const nextID = String(globalsData.nextBatchID) || String(Number(currID) + 1);
                        const nexxtID = String(Number(globalsData.nextBatchID) + 1) || String(Number(globalsData.currentBatchID) + 2);
                        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        if (batchMapSnapshot.exists()) {
                            const batchMap = batchMapSnapshot.data();
                            setBatchMap(batchMap);
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            const currBatchData = batchMap[currID];
                            const nextBatchData = batchMap[nextID];
                            const nexxtBatchData = batchMap[nexxtID];
                            const maxTokens = Number(globalsData.maxTokensForPresale);
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            if ( currBatchData && nextBatchData){
                                //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                                const currTokensLeft = Number(currBatchData[2]) - Number(currBatchData[3]);
                                setCurrentBatchData({
                                    currPrice: Number(currBatchData[4]),
                                    currTokensLeftInBatch: Math.round(Number(currTokensLeft) * Number(maxTokens) / 100),
                                    currEndTimestamp: Number(nextBatchData[1]),
                                });
                            }
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            if (   nextBatchData  && nexxtBatchData){
                                const nextTokensLeft = Number(nextBatchData[2]) - Number(nextBatchData[3]);
                                setNextBatchData({
                                    nextPrice: Number(nextBatchData[4]),
                                    nextTokensLeftInBatch: Math.round(Number(nextTokensLeft) * Number(maxTokens) / 100),
                                    nextEndTimestamp: Number(nexxtBatchData[1]),
                                });
                            }
                        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        }
                    }
                } catch (error) {
                } finally {
                    setLoading(false); 
                }
            };
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            fetchBatchData();
            const interval = setInterval(fetchBatchData, 1000);
            return () => clearInterval(interval);
        //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
        } catch(e){}
    }, []);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    return { 
        presaleGlobals, 
        currentBatchData, 
        nextBatchData, 
        loading, 
        batchMap, 
        setCurrentBatchData, 
        setNextBatchData
    };
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
};
