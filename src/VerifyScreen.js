import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import twilio from 'twilio';

const accountSid = "ACd1adc2ff0ada6bffbcd003a9e5c75e24";
const authToken ="f575eea69e06b2590e3088ea4a832701";
const verifySid = "VA846265135520d0ae1edd1e07d3bb9387";

const client = twilio(accountSid, authToken);

const VerifyScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');

  const handleSendCode = () => {
    client.verify.services(verifySid)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
      .then((verification) => console.log(verification.status));
  };

  const handleVerifyCode = () => {
    client.verify.services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode })
      .then((verification_check) => setVerificationStatus(verification_check.status));
  };

  return (
    <View>
      <Text>Enter your phone number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send code" onPress={handleSendCode} />

      <Text>Enter your OTP code:</Text>
      <TextInput
        value={otpCode}
        onChangeText={setOtpCode}
      />
      <Button title="Verify code" onPress={handleVerifyCode} />

      <Text>{verificationStatus}</Text>
    </View>
  );
};

export default VerifyScreen;
