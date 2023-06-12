import { TextField, Stack, Button } from "@mui/material";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

function MuiLoginFom() {
  type initialValues = {
    email: string;
    password: string;
  };
  const form = useForm<initialValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const onSubmit = (values: initialValues) => {
    console.log("onSubmit", values);
  };
  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h3>Mui Login Fom</h3>
        <Stack spacing={2} width={400}>
          <TextField
            type="text"
            label="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            type="password"
            label="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type="submit" variant="contained" color="primary">
            Login{" "}
          </Button>
          <DevTool control={control} />
        </Stack>
      </form>
    </>
  );
}

export default MuiLoginFom;
