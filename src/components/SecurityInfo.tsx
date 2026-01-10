import ErrorBoundary from '../ErrorBoundary'; 
import React from 'react';
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
interface SecurityInfoProps {
  onClose: () => void;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SecurityInfo: React.FC<SecurityInfoProps> = ({onClose}) => {
try{
    return (
      <ErrorBoundary>
          <div className="security-info-wrapper">
              <div className="security-info-close-button" onClick={onClose}>
                  <span className="security-info-close-button-span">X</span>
              </div>
            <div className="security-info-header">
              <h2 className="security-info-title">Important</h2>
                <hr></hr>
                <div className="faq-content">
                  <table>
                    <tbody>
                    <br/>
                      <tr><th className='security-info-intro-title'>
                        <span>Community is Family ❤️</span><br style={{marginBottom: "10px"}}/>
                        </th></tr>
                      <tr>
                          <th className='security-info-intro'>
                          <span style={{color: "white", fontWeight: '700'}}>BeMeow cares !</span><br style={{marginBottom: "1px"}}/>
                            <span style={{color: "white"}}>Whether you're new to crypto or experienced.</span>
                            <br style={{marginBottom: "0px"}}/><br style={{marginBottom: "1px"}}/>
                            <span>Negligence is mostly reason for lost or stolen funds. </span>
                            <span >Please read following info carefully</span><br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                          <th className='security-info-paragraph'>
                            <span className='security-info-paragraph-title'>
                              1. Never sign Tx you haven't initiated
                            </span>
                          <span>• Worst Case = Approve full control to a third. </span>  <br/>        
                          <span>• Only use established websites and wallets. </span>  <br/> 
                          <span>• Don't claim assets you received unsolicited.</span>  <br/>   
                          </th>
                      </tr>
                      <br/>
                      <tr>
                      <th className='security-info-paragraph'>
                        <span className='security-info-paragraph-title'>
                            2. Never store secret keys on hot devices
                            </span>
                            <span>• Whether passwords, seeds, or private keys.</span><br/>
                            <span>• Malware can scan your pc / phone / tablet.</span><br/>
                            <span>• Better store them offline and encrypted.</span><br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                        <th className='security-info-paragraph'>
                          <span className='security-info-paragraph-title'>
                            3. Never share secret keys !.
                            </span>
                          <span>• Also not with any "customer support".</span><br/>
                          <span>• No one needs it, but a thief.</span><br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                      <th className='security-info-paragraph'>
                          <span className='security-info-paragraph-title'>
                            4. Beware of fake addresses
                            </span>
                            <span>• Address start/end looks like the original.</span> <br style={{marginBottom: "5px"}}/>
                            <span>• Always double-check with the official source!</span>  <br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                        <th className='security-info-paragraph'>
                        <span className='security-info-paragraph-title'>
                            5. Don't click unchecked links
                            </span>
                          <span>• They can trigger wallet drainer transactions.</span> <br/>
                          <span>• Sign out of your wallet when not in use.</span>  <br/>
                          <span>• Set a whitelist and only use trusted links.</span>  <br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                      <th className='security-info-paragraph'>
                          <span className='security-info-paragraph-title'>
                            6. Use Best Practise
                            </span>
                          <span>• Set strong passwords. Change them regularly. </span><br/>
                          <span>• Don't reuse them. Clear your cache daily. </span><br/>
                          <span>• Set multi-factor-auth where possible. </span><br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                      <th className='security-info-paragraph'>
                          <span className='security-info-paragraph-title'>
                            7. No FOMO
                            </span>
                          <span>• Most memecoin issuers dump on their holders</span> <br/>
                          <span>• Be sceptical and do checks before buying.</span>   <br/>
                          <span>• Find projects that seek solving problems.</span>   <br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                      <th className='security-info-paragraph'>
                          <span className='security-info-paragraph-title'>
                            8. Crypto is a Rollercoaster
                            </span>
                          <span>• What pumps fast can dump fast.</span> <br/>
                          <span>• Set a strategy, stick to it & improve it.</span> <br/>
                          <span>• Consider take-profits on the way up.</span> <br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                      <th className='security-info-paragraph'>
                          <span className='security-info-paragraph-title'>
                            9. Diversify Risk
                            </span>
                          <span>• Don't keep all coins in one wallet.</span><br/>
                          <span>• Spread them to avoid single point of failure.</span><br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                      <th className='security-info-paragraph'>
                          <span className='security-info-paragraph-title'>
                            10. Did you know?
                            </span>
                          <span>• You can create & keep wallets fully offline.</span> <br/>
                          <span>• Until you sell and use a new wallet after.</span> <br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                          <th className='security-info-paragraph'>
                          <span className='security-info-paragraph-title'>
                            11. Never Forget
                            </span>
                          <span>• Scammers lure behind every corner.</span>  <br/>
                          <span>• Don't invite them by typical mistakes!</span>  <br/>
                          </th>
                      </tr>
                      <br/>
                      <tr>
                          <th className="security-info-outro">
                          <span>This info is no finacial advice.</span><br style={{marginBottom: "0px"}}/>
                          <span>But, we hope it helps you to stay safe! ❤️</span>
                          </th>
                      </tr>
                      <br/>
                      <hr></hr>
                      <tr>
                          <th className="security-info-greets">
                            Your BeMeow team 😽
                          </th>
                      </tr>
                    </tbody>
                  </table>
                  </div>
              </div>
          </div>
      </ErrorBoundary>
    );
  }catch(e){}
};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SecurityInfo;
