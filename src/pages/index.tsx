import { content } from "@/interfaces/contentProps";
import { useRouter } from "next/router";
import { useEffect} from 'react';
import allData from "../../public/allData.json";


export default function Home() {
  const route = useRouter()
  // const { currentLanguage } = useContext<ContextProps>(PageContext)

  // useEffect(() => {
  //   if (currentLanguage) route.push(`${currentLanguage}/${data[currentLanguage][0].id}`) 
  // }, [currentLanguage])

  useEffect(() => {
    route.push('/pt-br/inicio')
  }, [route]);

  return <></>
}

// export async function getStaticProps() {
//   const data: any = allData.data

//   return {
//     props: {
//       data: data
//     }
//   }
// }