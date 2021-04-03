export default interface IUpdateUserDTO {
  id: string;
  user: {
    name: string;
    email: string;
    password: string;
  };
}
