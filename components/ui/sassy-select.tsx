import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

export default function SassySelect({
  labelKey,
  valueKey,
  options,
  placeholder,
  ...props
}: SelectProps & {
  labelKey: string;
  valueKey: string;
  placeholder: string;
  options: any[];
}) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option[valueKey]} key={option[valueKey]}>
            {option[labelKey]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
