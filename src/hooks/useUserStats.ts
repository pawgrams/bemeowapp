import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { dbConfig } from './dbConfig';
//  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const useUserStats = (userAddress: string) => {
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [purchasedTokens, setPurchasedTokens] = useState<number | string>(0);
    const [referralRewards, setReferralRewards] = useState<number | string>(0);
    const [affiliateRewards, setAffiliateRewards] = useState<number | string>(0);
    const [reAffiliateRewards, setReAffiliateRewards] = useState<number | string>(0);
    const [usdSpent, setUsdSpent] = useState<number | string>(0);
    const [totalTokens, setTotalTokens] = useState<number | string>(0);
    const [dcaVal, setDcaVal] = useState<number | string>(0);
    const [loading, setLoading] = useState(true);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        try{
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            if (!userAddress || userAddress === "") {
                setLoading(false);
                return;
            }
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            const fetchUserStats = async () => {
                //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                setLoading(true);
                try {
                    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    const dbConfigs = await dbConfig();
                    let app;
                    if (!getApps().length) {
                        app = initializeApp(dbConfigs);
                    } else {
                        app = getApps()[0];
                    }
                    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    const db = getFirestore(app);
                    const userStatsDoc = doc(db, "db_userStats", userAddress);
                    const userStatsSnapshot = await getDoc(userStatsDoc);
                    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    if (userStatsSnapshot.exists()) {
                        try{
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            const data = userStatsSnapshot.data();
                            const userStats = data[userAddress] || [];
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            const purchased = Number(userStats[0]) || 'n/a';
                            const referral = Number(userStats[1]) || 'n/a';
                            const affiliate = Number(userStats[2]) || 'n/a';
                            const reAffiliate = Number(userStats[3]) || 'n/a';
                            const spent = Number(userStats[4]) || 'n/a';
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            setPurchasedTokens(purchased);
                            setReferralRewards(referral);
                            setAffiliateRewards(affiliate);
                            setReAffiliateRewards(reAffiliate);
                            setUsdSpent(spent);
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            let total = 0;
                            if (typeof purchased === 'number') total += purchased;
                            if (typeof referral === 'number') total += referral;
                            if (typeof affiliate === 'number') total += affiliate;
                            if (typeof reAffiliate === 'number') total += reAffiliate;
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            setTotalTokens(total === 0 ? 'n/a' : total);
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                            if (typeof total === 'number' && total > 0 && typeof spent === 'number') {
                                setDcaVal(spent / total);
                            } else {
                                setDcaVal('n/a');
                            }
                            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        } catch(e){}
                    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    } else {
                        setPurchasedTokens('n/a');
                        setReferralRewards('n/a');
                        setAffiliateRewards('n/a');
                        setReAffiliateRewards('n/a');
                        setUsdSpent('n/a');
                        setTotalTokens('n/a');
                        setDcaVal('n/a');
                    }
                //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                } catch (error) {
                    setPurchasedTokens('n/a');
                    setReferralRewards('n/a');
                    setAffiliateRewards('n/a');
                    setReAffiliateRewards('n/a');
                    setUsdSpent('n/a');
                    setTotalTokens('n/a');
                    setDcaVal('n/a');
                //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                } finally {
                    setLoading(false);
                }
            };
            //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            fetchUserStats();
        } catch(e){}
    }, [userAddress]);
    //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return { stats: [purchasedTokens, referralRewards, affiliateRewards, reAffiliateRewards, usdSpent, totalTokens, dcaVal], loading };
};
