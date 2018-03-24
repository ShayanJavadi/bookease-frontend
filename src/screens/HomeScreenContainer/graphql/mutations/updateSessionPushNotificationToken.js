import gql from "graphql-tag";

const updateSessionPushNotificationTokenMutation = gql`
  mutation updateSessionPushNotificationTokenMutation($token: String) {
    updateSessionPushNotificationToken(token: $token)
  }
`;

export default updateSessionPushNotificationTokenMutation;
