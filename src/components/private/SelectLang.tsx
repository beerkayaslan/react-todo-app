
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { defaultAlllangs } from "@/state/useLangState"
import useLangState from "@/state/useLangState"

export default function SelectLang() {

    const { setLang, lang: dataLang } = useLangState();

    return (
        <Select defaultValue={dataLang.ShortName} onValueChange={(shortName) => {
            const lang = defaultAlllangs.find(lang => lang.ShortName === shortName);
            lang && setLang(lang);
        }}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {defaultAlllangs.map((lang, index) => (
                        <SelectItem
                            key={index}
                            
                            value={lang.ShortName}
                        >
                            {lang.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
