import {generateHours} from "@/modules/common/utils/utils.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Label} from "@/components/ui/label.tsx";

const hours = generateHours(7, 22, 30);

type HoursSelectProps = {
    hoursValidFrom?: string;
    label: string;
    id: string;
    value: string;
    onChange: (hour: string) => void;
}

const HoursSelect = ({hoursValidFrom, label, id, value, onChange}: HoursSelectProps) => {
    const validHours = hoursValidFrom ? hours.filter(hour => hour > hoursValidFrom) : hours;

    return (
        <div className="flex flex-col flex-1 gap-2">
            <Label htmlFor={id} className="pl-1">{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={id}>
                    <SelectValue placeholder="Horário"/>
                </SelectTrigger>
                <SelectContent>
                    {validHours.map((hour, index) => (
                        <SelectItem value={hour} key={index}>{hour}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default HoursSelect;