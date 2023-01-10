import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import { FC } from "react";
import { InputHTMLAttributes } from "react";

type BaseProps = {
  name: string;
  label: string;
  textArea?: boolean;
};

const InputField: FC<{
  name: string;
  label: string;
  textArea?: boolean;
  [key: string]: any;
}> = ({ textArea, ...props }) => {
  const [field, { error }] = useField(props);
  const Component = props.textArea ? Textarea : Input;
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Component
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
