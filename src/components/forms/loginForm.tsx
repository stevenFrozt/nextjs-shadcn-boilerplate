"use client";
import { useFormik } from "formik";
import Group from "../Base/Group";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { Button } from "../ui/button";
import TextField from "../TextField";
import { loginInitialValues, loginSchema } from "@/schema/loginSchema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginSchema,
    onSubmit: SubmitHandler,
  });

  async function SubmitHandler(values: any) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    response?.error
      ? setErrorMessage(JSON.parse(response.error).errors || "")
      : router.push(callbackUrl || "/");
  }

  return (
    <>
      <div className="w-4/5 pt-6  mx-auto">
        <form onSubmit={formik.handleSubmit} className="w-full ">
          <Group
            vertical
            className="w-full"
            align="center"
            justify="center"
            gap="gap-6"
          >
            <TextField
              label="Email"
              name="email"
              placeholder="Enter Email"
              onChange={(e: any) => {
                formik.handleChange(e);
                formik.setFieldTouched("email", false, false);
                setErrorMessage("");
              }}
              value={formik.values.email}
              helper={formik.errors.email || Boolean(errorMessage)}
              touched={formik.touched.email}
              className="w-full"
              required="none"
            />
            <TextField
              label="Password"
              name="password"
              placeholder="Enter Password"
              onChange={(e: any) => {
                formik.handleChange(e);
                formik.setFieldTouched("password", false, false);
                setErrorMessage("");
              }}
              value={formik.values.password}
              helper={formik.errors.password || errorMessage}
              className="w-full"
              required="none"
            />
            <Group
              className="text-sm w-full py-2"
              align="center"
              justify="between"
            >
              <Group align="center" gap="gap-2">
                <Checkbox id="remember" className="h-4 w-4" />
                <label htmlFor="remember" className="py-1 cursor-pointer">
                  Remember me
                </label>
              </Group>
              <Link href={""}>Forgot password</Link>
            </Group>
            <Button className="w-full py-6 mt-4">Sign In</Button>
          </Group>
        </form>
      </div>
    </>
  );
}
