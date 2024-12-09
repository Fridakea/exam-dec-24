import { FC } from "react";

type RadioCardProps = {
  id: string;
  value?: string;
  required?: boolean;
  name: string;
  header: string;
  subHeader?: string;
};

export const RadioCard: FC<RadioCardProps> = ({ id, value, required = true, name, header, subHeader }) => {
  return (
    <div>
      <input className="peer hidden" type="radio" id={id} required={required} value={value ?? id} name={name} />
      <label
        htmlFor={id}
        className="inline-block w-fit h-fit p-4 bg-card border-2 border-transparent text-card-foreground ~text-lg/xl rounded-md peer-hover:bg-accent peer-hover:text-accent-foreground peer-checked:border-accent cursor-pointer"
      >
        {header}
        <p className="~text-sm/base">{subHeader}</p>
      </label>
    </div>
  );
};
