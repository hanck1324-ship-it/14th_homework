"use client";

import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();
  
  const onClickMenu = (path: string) => () => {
    router.push(path);
  };

  return {
    onClickMenu,
  };
};