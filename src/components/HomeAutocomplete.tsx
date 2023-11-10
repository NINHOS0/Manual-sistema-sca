import { itens, section, subsection } from "@/interfaces/contentProps";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList, Item } from "@choc-ui/chakra-autocomplete";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from 'react'


interface ISearch {
  route: string
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
  const search = useRef<any>()

  useEffect(() => {
    let searchs: ISearch[] = []
    data.forEach((sec: section) => {
      if (sec.content) {
        sec.content.forEach((item: itens) => {
          if (item.type === 'text' || item.type === 'link') {
            if (searchs.find(e => e.route === sec.id)) {
              searchs = searchs.map((e: ISearch) => e.route === sec.id ? { ...e, data: `${e.data} ${item.value.toLowerCase()}` } : e)
            }
            else {
              searchs.push({
                route: sec.id,
                name: sec.name,
                data: item.value.toLowerCase()
              })
            }
          } else if (item.type === 'list') {
            item.list.forEach(list => {
              if (searchs.find(e => e.route === sec.id)) {
                searchs = searchs.map((e: ISearch) => e.route === sec.id ? { ...e, data: `${e.data} ${list.title.toLowerCase()}${list.text ? ' ' + list.text.toLowerCase() : ''}` } : e)
              } else {
                searchs.push({
                  route: sec.id,
                  name: sec.name,
                  data: `${list.title.toLowerCase()}${list.text ? ' ' + list.text.toLowerCase() : ''}`
                })
              }
            })
          }
        })
      } else if (sec.routes) {
        sec.routes.forEach((sub: subsection) => {
          if (sub.content) {
            sub.content.forEach((item: itens) => {
              if (item.type === 'text' || item.type === 'link') {
                if (searchs.find(e => e.name === `${sec.name} > ${sub.name}`)) {
                  searchs = searchs.map((e: ISearch) => e.name === `${sec.name} > ${sub.name}` ? { ...e, data: `${e.data} ${item.value.toLowerCase()}` } : e)
                }
                else {
                  searchs.push({
                    route: `${sec.id}/${sub.id}`,
                    name: `${sec.name} > ${sub.name}`,
                    data: item.value.toLowerCase()
                  })
                }
              } else if (item.type === 'list') {
                item.list.forEach(list => {
                  if (searchs.find(e => e.name === `${sec.name} > ${sub.name}`)) {
                    searchs = searchs.map((e: ISearch) => e.name === `${sec.name} > ${sub.name}` ? { ...e, data: `${e.data} ${list.title.toLowerCase()}${list.text ? ' ' + list.text.toLowerCase() : ''}` } : e)
                  } else {
                    searchs.push({
                      route: `${sec.id}/${sub.id}`,
                      name: `${sec.name} > ${sub.name}`,
                      data: `${list.title.toLowerCase()}${list.text ? ' ' + list.text.toLowerCase() : ''}`
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
    setSearchResult(searchs)
  }, [data]);

  return (
    <AutoComplete
    onSelectOption={({ item }: { item: Item }) => route.push(`/${lang}/${searchResult.filter(e => e.name === item.label)[0].route}${search.current.value.trim() !== '' ? '?s='+search.current.value.trim().toLowerCase() : ''}`)}
      filter={(query: string, optionValue: Item["value"]) => optionValue.includes(query.toLowerCase())}
    >
      <AutoCompleteInput
        placeholder={lang === 'en' ? 'Search...' : 'Pesquisar...'}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.value = ""}
        ref={search}
      />
      <AutoCompleteList>
        {searchResult.map((item, id) => (
          <AutoCompleteItem
            key={`option-${id}`}
            label={item.name}
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