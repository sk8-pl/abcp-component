import { IButtonProps } from "../../types/types";

function ButtonGetUsers({ onClick }: IButtonProps): JSX.Element {
  return (
    <button type="button" onClick={onClick}>
      get random user
    </button>
  );
}

export default ButtonGetUsers;
