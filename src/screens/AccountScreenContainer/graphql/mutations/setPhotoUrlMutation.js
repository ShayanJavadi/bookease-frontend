import gql from "graphql-tag";

const setPhotoUrlMutation = gql`
  mutation setPhotoUrlMutation($phoneNumber: String, $photoUrl: String) {
    updateProfile(phoneNumber: $phoneNumber, photoURL: $photoUrl) { id }
  }
`;

export default setPhotoUrlMutation;
