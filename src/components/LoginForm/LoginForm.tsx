import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Link from "../Link/Link";
import s from "./LoginForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import Error from "../Error/Error";
import { Inputs, validateUser } from "../../utils/validation";
import { useKeycloak } from "@react-keycloak/web/lib/useKeycloak";

const validationSchema = yup
  .object()
  .shape({
    username: yup.string().required("Введите почту"),
    password: yup.string().required("Введите пароль"),
  })
  .test(
    "check-username-password",
    "Некорректная почта или пароль",
    async (value) => {
      const response = await validateUser(value);
      return response;
    }
  );

const schema = yup
  .object({
    username: yup.string().email().required("Введите почту"),
    password: yup.string().required("Введите пароль"),
  })
  .required();

const LoginForm = () => {
  const { keycloak, initialized } = useKeycloak();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data: Inputs) => {
    const username = data.username;
    const password = data.password;
    keycloak.login();
  };

  return (
    <div className={s.blur_background}>
      <form className={s.login_container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={s.title}>Вход в UniRunner</h1>
        <div className={s.input_div}>
          <Input
            label="Почта"
            id="username_input"
            placeholder="example.login@mail.ru"
            {...register("username", { required: true })}
          >
            {errors.username?.message && (
              <Error text={errors.username?.message} />
            )}
          </Input>
          <Input
            label="Пароль"
            id="password_input"
            type="password"
            {...register("password", { required: true })}
          >
            {errors.password?.message && (
              <Error text={errors.password?.message} />
            )}
          </Input>
        </div>
        <Button
          text="Войти"
          fullWidth
          type="submit"
          onClick={() => keycloak.login()}
        />
        <div className={s.question_div}>
          <p className={s.default_text}>Ещё нет аккаунта?</p>
          <Link text="Зарегистрируйтесь!" to={"#"} />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
