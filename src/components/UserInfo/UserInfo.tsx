import { memo } from "react";
import { IUserInfoProps } from "../../types/types";

const UserInfo = ({ user }: IUserInfoProps): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user.name}</td>
          <td>{user.phone}</td>
        </tr>
      </tbody>
    </table>
  );
};

function UserInfoPropsAreEqual(prevProps: IUserInfoProps, nextProps: IUserInfoProps) {
  return prevProps.user.name === nextProps.user.name
    && prevProps.user.phone === nextProps.user.phone;
}

export default memo(UserInfo, UserInfoPropsAreEqual);
