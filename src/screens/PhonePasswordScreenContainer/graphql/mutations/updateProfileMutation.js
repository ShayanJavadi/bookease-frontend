import gql from "graphql-tag";

const updateProfileMutation = gql`
  mutation updateProfileMutation($pushNotificationId: String) {
    updateProfile(pushNotificationId: $pushNotificationId) { id, pushNotificationId }
  }
`;

export default updateProfileMutation;
