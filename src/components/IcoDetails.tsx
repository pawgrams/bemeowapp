import ErrorBoundary from '../ErrorBoundary'; 
import React from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
interface IcoDetailsProps {
  onClose: () => void;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
const IcoDetails: React.FC<IcoDetailsProps> = ({ onClose }) => {
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
try{
    return (

    <ErrorBoundary>

        <div className="details-wrapper">

            <div className="details-close-button" onClick={onClose}>
                <span className="details-close-button-span">X</span>
            </div>

            <div className="details-header">
                <h2 className="ico-details-title">Details</h2>
            </div>

            <div className="ico-content">

                <table className="ico-details-table" style={{ fontSize: '12px' }}>

                    <tbody>

                        <tr>
                            <th>
                                <hr></hr>
                            </th>
                            <th>
                                <hr></hr>
                            </th>
                            <th>
                                <hr></hr>
                            </th>
                        </tr>

                        <tr>
                            <th className="ico-details-section-title"><span>ICO</span></th><th></th><th className="ico-details-col-2"></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Ends</span></th><th className="ico-details-col-2"><span>Jan 2025</span></th>
                        </tr>

                        <tr>
                            <th>
                                <hr></hr>
                            </th>

                            <th>
                                <hr></hr>
                            </th>

                            <th>
                                <hr></hr>
                            </th>
                        </tr>

                        <tr>
                            <th className="ico-details-section-title"><span>Vesting</span></th><th></th><th className="ico-details-col-2"></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Lock Period</span></th><th className="ico-details-col-2"><span>1 Month</span></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Release Interval</span></th><th className="ico-details-col-2"><span>Monthly</span></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Monthly Release</span></th><th className="ico-details-col-2"><span>5%</span></th>
                        </tr>

                        <tr>
                            <th>
                                <hr></hr>
                            </th>

                            <th>
                                <hr></hr>
                            </th>

                            <th>
                                <hr></hr>
                            </th>
                        </tr>

                        <tr>
                            <th className="ico-details-section-title"><span>Tokenomics</span></th><th></th><th className="ico-details-col-2"></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Initial Supply</span></th><th className="ico-details-col-2"><span>1 Billion ¹</span></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Liquidity</span></th><th className="ico-details-col-2"><span>24% max</span></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>ICO</span></th><th className="ico-details-col-2"><span>54% max</span></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Treasury</span></th><th className="ico-details-col-2"><span>10%</span></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Reserve</span></th><th className="ico-details-col-2"><span>4%</span></th>  
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Team</span></th><th className="ico-details-col-2"><span>4%</span></th>  
                        </tr>

                        <tr>     
                            <th className="ico-details-col-1"><span>Marketing</span></th><th className="ico-details-col-2"><span>2%</span></th>   
                        </tr>

                        <tr>     
                            <th className="ico-details-col-1"><span>Airdrops</span></th><th className="ico-details-col-2"><span>2%</span></th>
                        </tr>

                        <tr>
                            <th className="ico-details-col-1"><span>Affiliate</span></th><th className="ico-details-col-2"><span>8% max ²</span></th> 
                        </tr>

                        <tr>
                        </tr>

                        <tr>
                            <th>
                                <hr></hr>
                            </th>

                            <th>
                                <hr></hr>
                            </th>

                            <th>
                                <hr></hr>
                            </th>
                        </tr>

                    </tbody>

                </table>

                <span className="ico-details-footnotes">¹ To be reduced after ICO to optimize LP/MC-Ratio</span><br></br>
                <span className="ico-details-footnotes">² From remainings of LP & ICO, instead of burning </span>

            </div>
        </div>

    </ErrorBoundary>

    );

} catch(e){}

};

export default IcoDetails;
