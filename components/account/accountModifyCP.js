"use client";

import { putAccount } from "@/actions/accountActions";
import { signOut, useSession } from "next-auth/react";
import { useActionState, useEffect } from "react";

export default function AccountModifyCP() {
  const { data, status, update } = useSession();
  const [state, action, isPending] = useActionState(putAccount, {
    message: "",
    result: "",
  });

  useEffect(() => {
    if (state?.result === "success") {
      alert("다시 로그인 필요");
      signOut({ callbackUrl: "/" });
    }
  }, [state]);

  if (status === "unauthenticated") {
    return <div>Loading...</div>;
  }

  console.log("AccountModifyCP data: ", data);
  const { email, name } = data?.user || {};

  return (
    <div>
      <div>Account Modify Component</div>
      <form action={action}>
        <div>
          Email <input type="text" name="email" defaultValue={email} readOnly />
        </div>
        <div>
          Nickname <input type="text" name="nickname" defaultValue={name} />
        </div>
        <div>
          Password <input type="password" name="password" />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : "저장하기"}
        </button>
      </form>
    </div>
  );
}
