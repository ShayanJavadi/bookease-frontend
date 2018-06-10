import gql from "graphql-tag";

const deleteBookmarkMutation = gql`
  mutation deleteBookmark($bookmark: BookmarkInput!){
    deleteBookmark(bookmark: $bookmark)
  }
`;

export default deleteBookmarkMutation;
