import { FieldError } from "../generated/graphql";
import { useRouter } from "next/router";

export const errorMapper = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};

export const isServer = () => typeof window === "undefined";

export const useGetIntId = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  return intId;
};
