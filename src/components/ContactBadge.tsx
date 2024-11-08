import Group from "./Base/Group";
import { CONTACT_NUMBER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { FaPhone } from "react-icons/fa6";

type props = {
  className?: string;
  IconClassName?: string;
};
export default function ContactBadge({ className, IconClassName }: props) {
  return (
    <div
      className={cn(
        "bg-primary py-3 px-4 text-white rounded-md text-sm",
        className
      )}
    >
      <Group align="center" gap={"gap-2"}>
        <FaPhone />
        {CONTACT_NUMBER}
      </Group>
    </div>
  );
}
