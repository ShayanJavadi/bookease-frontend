import { Linking } from "react-native";

const openSms = ({ number, message }) => {
  return Linking.openURL(`sms:${number}&body=${message}`);
}

export default openSms;
