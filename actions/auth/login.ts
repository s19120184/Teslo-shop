"use server";

import { signIn } from "@/src/auth.config";

type ActionStateType = {
  errors: string[];
  success: string;
};

export async function aunthenticate(
  prevState: ActionStateType,
  formData: FormData
) {
  try {
    //recuperar los datos
    const registerData = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    if (!registerData.email) {
      return {
        errors: ["data incompleta"],
        success: ""
      };
    }

    await signIn("credentials", {
      ...registerData,
      redirect: false
    });

    return {
      errors: [""],
      success: "Success"
    };
  } catch (error) {
    console.log(error);
    return {
      errors: ["CredentialsSigin"],
      success: ""
    };
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });

    return {
      ok: true
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Nose pudo iniciar sesión"
    };
  }
};
