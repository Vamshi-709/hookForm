import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function YupYtForm() {
  type initialValues = {
    username: string;
    email: string;
    channel: string;
  };

  const schema = yup.object({
    username: yup.string().required("Nam is required"),
    email: yup
      .string()
      .email("Email format is not Correct")
      .required("Email is required"),

    channel: yup.string().required("Channel is required"),
  });

  const form = useForm<initialValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const onSubmit = (data: initialValues) => {
    console.log("onSubmit", data);
  };
  return (
    <>
      <div>Yup YoutubeForm</div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username">first Name :</label>
          <input
            type="text"
            className="form-control"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "name is required",
              },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div>
          <label htmlFor="username">Email :</label>
          <input
            type="text"
            className="form-control"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="channel">Channel :</label>
          <input
            type="text"
            className="form-control"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <button type="submit"> Submit</button>
        <DevTool control={control} />
      </form>
    </>
  );
}

export default YupYtForm;
