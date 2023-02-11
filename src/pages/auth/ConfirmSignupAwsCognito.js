import React, {useState} from 'react';
import {Button} from 'antd';
import IntlMessages from '../../@crema/utility/IntlMessages';
import ReactCodeInput from 'react-code-input';
import './AuthWrapper.style.less';
import {useHistory, useLocation} from 'react-router-dom';
import {fetchError} from '../../redux/actions';
import {useIntl} from 'react-intl';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import AuthWrapper from './AuthWrapper';
import {useAuthMethod} from '../../@crema/utility/AuthHooks';

const ConfirmSignupAwsCognito = () => {
  const {confirmCognitoUserSignup} = useAuthMethod();
  const history = useHistory();
  const location = useLocation();

  const {messages} = useIntl();
  const handleSubmit = () => {
    const {email} = location.state || {};
    if (email && pin.length === 6) {
      confirmCognitoUserSignup(email, pin);
    } else if (!email) {
      history.push('/signup');
      fetchError(messages['validation.tryAgain']);
    } else {
      fetchError(messages['validation.pinLength']);
    }
  };
  const [pin, setPin] = useState('');

  return (
    <AuthWrapper>
      <AppPageMetadata title='Confirm Signup' />

      <div className='auth-recon-content'>
        <div className='confirm-content'>
          <p>
            <IntlMessages id='common.verificationMessage' />
          </p>
        </div>

        <div className='confirm-code-input'>
          <ReactCodeInput
            type='password'
            value={pin}
            fields={6}
            onChange={(value) => setPin(value)}
          />
        </div>

        <Button type='primary' className='confirm-btn' onClick={handleSubmit}>
          <IntlMessages id='common.submit' />
        </Button>
      </div>
    </AuthWrapper>
  );
};

export default ConfirmSignupAwsCognito;
