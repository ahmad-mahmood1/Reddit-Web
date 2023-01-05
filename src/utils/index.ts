import { FieldError } from "../generated/graphql";

export const errorMapper = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });

  return errorMap;
};

export const isServer = () => typeof window === "undefined";
