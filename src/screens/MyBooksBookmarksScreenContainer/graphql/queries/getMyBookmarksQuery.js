import gql from "graphql-tag";

const getMyBookmarksQuery = gql`
  query getMyBookmarks($limit: Int){
    getMyBookmarks(limit: $limit){
        id,
        userId,
        textbook {
          id, 
          title,
          price,
          edition,
          industryIdentifiers{
              type,
              identifier
          },
          images{
              thumbnail
          },
          userId,
          createdAt,
          updatedAt,
          publishedAt,
        }
    }
  }
`;

export default getMyBookmarksQuery;
