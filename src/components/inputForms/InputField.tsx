import { ComponentPropsWithoutRef } from "react";

type InputFieldProps = {
  error: string | undefined;
  LabelTitle: string;
};

const InputField = ({
  LabelTitle,
  id,
  error,
  ...props
}: ComponentPropsWithoutRef<"input"> & InputFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id}>{LabelTitle}</label>
      <input
        id={id}
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline bg-antiquewhite"
        {...props}
      />
      {error && <div className="font-normal text-red-600">{error}</div>}
    </div>
  );
};

export default InputField;
