export default interface IUpdatePostDTO {
  id: string;
  post: {
    message: string;
    likes: number;
    userId: string;
  };
}
