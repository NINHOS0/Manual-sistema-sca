import { itens, section } from "@/interfaces/contentProps";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList, Item } from "@choc-ui/chakra-autocomplete";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react'


interface ISearch {
  id: string
  name: string
  data: string
}

interface HomeAutocompleteProps {
  data: section[],
  lang: string
}

export default function HomeAutocomplete({ data, lang }: HomeAutocompleteProps) {
  const [searchResult, setSearchResult] = useState<ISearch[]>([])
  const route = useRouter()

  useEffect(() => {
    let searchs: ISearch[] = []
    data.forEach((sec: section) => {
      // if (sec.content) sec.content.forEach((item: itens) => {
        // if (item.type === 'text' || item.type === 'link') {
        //   searchs.push({
        //     route: sec.id,
        //     name: sec.name,
        //     data: item.value.toLowerCase()
        //   })
        // })

      sec.content?.forEach((item: any) => {
        if (item.value) {
          if (searchs.find(e => e.id === sec.id)) {

            searchs = searchs.map((e: ISearch) => {
              if (e.id === sec.id) return {...e, data: `${e.data} ${item.value.toLowerCase()}`}
              else return e
            })

          }
          else searchs.push({
            id: sec.id,
            name: sec.name,
            data: item.value.toLowerCase()
          })
        }
      })
    })
    setSearchResult(searchs)
  }, [data]);

  return (
    <AutoComplete
      onSelectOption={({ item }: { item: Item }) => route.push(`/${lang}/${item.label}`)}
      filter={(query: string, optionValue: Item["value"]) => optionValue.includes(query)}
    >
      <AutoCompleteInput
        placeholder={lang === 'en' ? 'Search...' : 'Pesquisar...'}
        w={96}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.value = ""}
      />
      <AutoCompleteList>
        {searchResult.map((item, id) => (
          <AutoCompleteItem
            key={`option-${id}`}
            label={item.id}
            value={item.data}
            textTransform="capitalize"
          >
            {item.name}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  )
}