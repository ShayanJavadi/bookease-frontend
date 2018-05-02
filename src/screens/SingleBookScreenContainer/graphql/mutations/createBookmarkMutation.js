import gql from "graphql-tag";

const createBookmarkMutation = gql`
  mutation createBookmark($bookmark: BookmarkInput!){
    createBookmark(bookmark: $bookmark) {
      id
      userId
      textbookId
    }
  }
`;

export default createBookmarkMutation;
