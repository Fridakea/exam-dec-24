import { clamp } from "@/lib/helpers";
import { ControllerRenderProps } from "react-hook-form";

import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FC } from "react";

type PlusMinusInputProps = {
  field: ControllerRenderProps<any>;
  min?: number;
  max?: number;
  step?: number;
};

export const PlusMinusInput: FC<PlusMinusInputProps> = ({ field, min = 0, max = 999, step = 1 }) => {
  return (
    <div className="flex flex-row gap-2">
      <Button
        size="icon"
        type="button"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => field.onChange(Math.max(min, field.value - step))}
        disabled={field.value <= min}
      >
        <Minus />
        <span className="sr-only">Increase</span>
      </Button>
      <Input
        {...field}
        type="number"
        step={step}
        onChange={(e) => field.onChange(clamp(min, Number(e.currentTarget.value), max))}
      />
      <Button
        size="icon"
        type="button"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => field.onChange(Math.min(field.value + step, max))}
        disabled={field.value >= max}
      >
        <Plus />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
};
