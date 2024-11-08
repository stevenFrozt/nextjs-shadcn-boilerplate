import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

type props = {
  className?: string;
  onChange: any;
  value: any;
  name: string;
  label?: string;
  placeholder?: string;
  helper?: string | boolean;
  type?: "text" | "password" | "number" | "email";
  touched?: boolean;
  required?: boolean | "none";
  loading?: boolean;
};
export default function TextField({
  className,
  onChange,
  value,
  name,
  label,
  placeholder,
  type,
  helper,
  touched = true,
  required = false,
  loading = false,
}: props) {
  if (loading) return <TextFieldSkeleton />;

  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={name} className="text-slate-500 text-sm ">
        {label}{" "}
        <span
          className={cn(
            required === true ? "text-red-500" : "text-gray-400 text-xs",
            required === "none" ? "hidden" : ""
          )}
        >
          {required ? "*" : " (Optional)"}
        </span>
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className={cn(
          "mt-1 h-11   ",
          helper && touched ? "border-2 border-red-500 text-red-500" : ""
        )}
      />
      <p
        className={cn(
          "py-2 text-xs text-red-500",
          typeof helper === "boolean"
            ? "hidden"
            : helper && touched
            ? "block"
            : "hidden"
        )}
      >
        {helper}
      </p>
    </div>
  );
}

function TextFieldSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <Skeleton className=" text-sm w-32 h-6"></Skeleton>
      <Skeleton className="mt-1 h-11" />
    </div>
  );
}
