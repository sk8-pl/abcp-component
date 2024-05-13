// Мы ожидаем, что Вы исправите синтаксические ошибки, сделаете перехват возможных исключений и улучшите читаемость кода.
// А так же, напишите кастомный хук useThrottle и используете его там где это нужно.
// Желательно использование React.memo и React.useCallback там где это имеет смысл.
// Будет большим плюсом, если Вы сможете закэшировать получение случайного пользователя.
// Укажите правильные типы.
// По возможности пришлите Ваш вариант в https://codesandbox.io

import React, { useCallback, useRef, useState } from "react";
import { User } from "./types/types";
import UserInfo from "./components/UserInfo/UserInfo";
import ButtonGetUsers from "./components/ButtonGetUsers/ButtonGetUsers";
import { getRandomIDUser } from "./services/tools/getRandomIDUsers";
import getUserAPI from "./services/servicesAPI/getUser";
import useThrottle from "./components/hooks/useThrottle";


function App(): JSX.Element {
  const [item, setItem] = useState<User | null>(null);
  const cachedUsersObject = useRef<Record<number, User>>({});

  const receiveRandomUser = useCallback(async () => {

    const id = getRandomIDUser();

    if (cachedUsersObject.current[id]) {
      setItem(cachedUsersObject.current[id]);
    } else {
      try {
        const user = await getUserAPI(id);

        setItem(user);
        cachedUsersObject.current[id] = user;
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    receiveRandomUser();
  };

  const throttledFn = useThrottle({ callbackFn: handleButtonClick, throttleMs: 2000 });

  return (
    <div>
      <header>Get a random user</header>
      <ButtonGetUsers onClick={throttledFn} />
      {item && <UserInfo user={item} /> }
    </div>
  );
}

export default App;
