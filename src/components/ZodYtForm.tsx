import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function ZodYtForm() {
  type initialValues = {
    username: string;
    email: string;
    channel: string;
  };

  const schema = z.object({
    username: z.string().nonempty("Nam is required"),
    email: z
      .string()
      .nonempty("Email format is not Correct")
      .email("Email is required"),

    channel: z.string().nonempty("Channel is required"),
  });

  const form = useForm<initialValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, control } = form;
  const { errors } = formState;
  const onSubmit = (data: initialValues) => {
    console.log("onSubmit", data);
  };
  return (
    <>
      <div>Zod YoutubeForm</div>
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

export default ZodYtForm;
