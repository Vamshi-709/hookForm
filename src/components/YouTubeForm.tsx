import React, { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let count = 0;
type initialValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumber: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  date: Date;
};
const YouTubeForm = () => {
  const form = useForm<initialValues>({
    defaultValues: {
      username: "vamshi krihna",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumber: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      date: new Date(),
    },
    mode: "onChange",
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger
  } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isValid,
    isDirty,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  console.log(
    { isSubmitting, isSubmitted, isSubmitSuccessful, submitCount },
    "dirty"
  );
  count++;

  const onSubmit = (data: initialValues) => {
    console.log("onSubmit", data);
  };
  const onError = (error: FieldErrors<initialValues>) => {
    console.log("onError", error);
  };

  const { fields, remove, append } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const handleGetValues = () => {
    console.log("handleGetValues ", getValues(["username", "age", "date"]));
  };
  const handleSetValue = () => {
    console.log(
      "handleSetValue",
      setValue("username", "", {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    );
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(` subscription`, value);
  //   });
  //   return () => subscription.unsubscribe();
  // } ,[watch]);

  // const watchedValues = watch();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <h2>Youtube Form({count / 2})</h2>
        {/* <h2>Watched Values : {JSON.stringify(watchedValues)}</h2> */}

        <br></br>
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
        <br></br>
        <div>
          <label htmlFor="email"> E-mail : </label>
          <input
            type="text"
            className="form-control"
            {...register("email", {
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "vamshi@gmail.com" ||
                    "enter the email address"
                  );
                },
                notBlacListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("yopmail") ||
                    "this domain not supported"
                  );
                },
                emailValidate: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already exists";
                },
              },
            })}
          />
          <p className="error"> {errors.email?.message}</p>
        </div>
        <br></br>
        <div>
          <label htmlFor="channel">Channel : </label>
          <input
            type="text"
            className="form-control"
            {...register("channel", {
              required: "channel is required",
            })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>
        <div>
          <label htmlFor="channel">Age : </label>
          <input
            type="number"
            className="form-control"
            {...register("age", {
              valueAsNumber: true,

              required: "Age is required",
            })}
          />
          <p className="error">{errors.age?.message}</p>
        </div>
        <br></br>
        {/* <div>
          <label htmlFor="channel">Date of Birth : </label>
          <input
            type="date"
            className="form-control"
            {...register("date", {
              valueAsDate: true,
              required: "Date is required",
            })}
          />
          <p className="error">{errors.date?.message}</p>
        </div> */}
        <br />
        {/* <div>
          <label htmlFor="twitter">Twitter : </label>
          <input
            type="text"
            className="form-control"
            {...register("social.twitter", {
              disabled: watch("channel") === "",
              required: "twitter is required",
            })}
          />
          <p className="error">{errors.social?.twitter?.message}</p>
        </div> */}
        <br></br>
        {/* <div>
          <label htmlFor="facebook">Facebook :</label>
          <input
            type="text"
            className="form-control"
            {...register("social.facebook", {
              required: "facebook is required",
            })}
          />
          <p className="error">{errors.social?.facebook?.message}</p>
        </div> */}
        <br></br>
        {/* <div>
          <label htmlFor="primary">Primary phonenumber : </label>
          <input
            type="text"
            className="form-control"
            {...register("phoneNumber.0", {
              required: "  primary phoneNumber  required",
            })}
          />{" "}
          <p className="error">{errors.phoneNumber?.message}</p>
        </div>
        <br></br>
        <div>
          <label htmlFor="secondary">Secondary phoneNumber : </label>
          <input
            type="text"
            className="form-control"
            {...register("phoneNumber.1", {
              required: "  secondary phoneNumber  required",
            })}
          />
          <p className="error">{errors.phoneNumber?.message}</p>
          <br></br>
        </div> */}
        {/* <div>
          <label>List of Phone Numbers :</label>

          {fields.map((field, index) => {
            return (
              <>
                <input
                  type="text"
                  className="form-control"
                  {...register(`phNumbers.${index}.number` as const)}
                />

                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
                <br />
              </>
            );
          })}
          <br></br>
          <br></br>

          <button type="button" onClick={() => append({ number: "" })}>
            Add Phone Numbers
          </button>
        </div> */}
        <br></br>
        <button type="submit" disabled={!isDirty || isSubmitting}>
          Submit
        </button>
        <button type="submit" onClick={() => reset()}>
          reset
        </button>
        <button type="submit" onClick={() => handleGetValues()}>
          Get Values
        </button>
        <button type="submit" onClick={() => trigger("channel")}>
        Validate Values
        </button>
        <button type="submit" onClick={() => handleSetValue()}>
          Set Value
        </button>

        <DevTool control={control} />
      </form>
    </div>
  );
};

export default YouTubeForm;
