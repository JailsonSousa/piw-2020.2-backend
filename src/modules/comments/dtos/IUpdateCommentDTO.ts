export default interface IUpdateCommentDTO {
  id: string;
  comment: {
    message: string;
    postId: string;
    userId: string;
  };
}
