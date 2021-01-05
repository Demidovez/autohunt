import { makeObservable, observable, action, runInAction, autorun } from "mobx";
import axios from "axios";

class UserStore {
  // Имя пользователя
  name = "";

  // Статус пользователя
  isLogined = false;

  // Роль пользователя
  role = "GUEST";

  constructor() {
    // Настраиваем MobX (для работы со состоянием)
    makeObservable(this, {
      name: observable,
      isLogined: observable,
      role: observable,
      tryLogin: action,
      trySignin: action,
      tryRestore: action,
      tryLogout: action,
    });

    // Проверка авторизован ли пользователь
    autorun(() => {
      if (!localStorage.getItem("token")) {
        this.isLogined = false;
      } else if (this.isLogined === false) {
        this.isLogined = true;
        this.name = localStorage.getItem("user");
      }
    });
  }

  // Попытка залогиниться
  tryLogin = ({ email, password }) => {
    axios
      .post("https://server.autohunt.by/get_user", { email, password })
      .then((user) => {
        if (user.data) {
          // TODO: Подумать над авторизацией
          localStorage.setItem("token", user.data.token || 1);
          localStorage.setItem("user", user.data.name);

          runInAction(() => {
            this.name = user.data.name;
            this.isLogined = user.data.isActive;
            this.role = user.data.role;
          });
        }
      });
  };

  // Попытка зарегистрироваться
  trySignin = ({ name, email, password }) => {
    axios
      .post("https://server.autohunt.by/sign_user", { name, email, password })
      .then((user) => {
        if (user.data) {
          console.log(user);
          localStorage.setItem("token", user.data.token || 1);
          localStorage.setItem("user", user.data.name);

          runInAction(() => {
            this.name = user.data.name;
            this.isLogined = user.data.isActive;
            this.role = user.data.role;
          });
        }
      });
  };

  // Попытка восстановить пароль
  tryRestore = ({ email, password }) => {
    // axios
    //   .post("https://server.autohunt.by/get_user", { email, password })
    //   .then((user) => {
    //     if (user.data) {
    //       runInAction(() => {
    //         this.name = user.data.name;
    //         this.isLogined = user.data.isActive;
    //         this.role = user.data.role;
    //       });
    //     }
    //   });
  };

  // Попытка разлогиниться
  tryLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.name = "";
    this.isLogined = false;
    this.role = "GUEST";
  };
}

export default new UserStore();
