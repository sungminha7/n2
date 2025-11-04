"use server";

const API_SERVER_HOST = process.env.API_SERVER_HOST || "http://localhost:8080";

export const putAccount = async (prevState, formData) => {
  try {
    console.log("putAccount called");
    console.log("putAccount formData: ", formData);

    if (!formData) {
      console.error("putAccount: formData is undefined");
      return { message: "FormData is missing", result: "fail" };
    }

    const email = formData.get("email");
    const nickname = formData.get("nickname");
    const password = formData.get("password");

    console.log("putAccount form values:", {
      email,
      nickname,
      password: password ? "***" : "empty",
    });

    const updatedFormData = new FormData();
    if (email) updatedFormData.append("email", email);
    if (nickname) updatedFormData.append("nickname", nickname);
    if (password) updatedFormData.append("password", password);

    console.log(
      "putAccount calling API:",
      `${API_SERVER_HOST}/api/accounts/modify`
    );

    const res = await fetch(`${API_SERVER_HOST}/api/accounts/modify`, {
      method: "PUT",
      body: updatedFormData,
    });

    console.log("putAccount response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("putAccount API error:", errorText);
      return { message: "Failed to update account", result: "fail" };
    }

    const result = await res.json();
    console.log("putAccount result: ", result);

    return { message: "Account updated successfully", result: "success" };
  } catch (error) {
    console.error("putAccount error:", error);
    return {
      message: error.message || "Failed to update account",
      result: "fail",
    };
  }
};
