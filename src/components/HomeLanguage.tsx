import { language } from "@/interfaces/contentProps";
import { Select, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo } from 'react';

const HomeLanguage = ({ languages }: { languages: language[] }) => {
  const route = useRouter()
  const { page, s } = route.query

  return (
    <Tooltip label={page![0] === 'en' ? 'Language' : 'Idioma'}>
      <Select defaultValue={page![0]} variant="unstyled" w={"28"} onChange={(e) => route.push(`/${e.target.value}/${page?.slice(1).toString().replaceAll(',', '/')}}`)}>
        {languages && languages.map((lang: language) => (
          <option key={lang.id} style={{ color: "white", backgroundColor: "#171923" }} value={lang.id}>
            {lang.name}
          </option>
        ))}
      </Select>
    </Tooltip>
  )
}

export default memo(HomeLanguage)