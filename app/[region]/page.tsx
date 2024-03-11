import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

type Props = {
  params: {
    region: string
  }
}

export default async function Regions({ params: { region } }: Props) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  let regionId = Number(region.slice(6))
  console.log("Regionnn: ", region)
  console.log("NumberRegion: ", regionId)

  let { data: regionstatistic, error } = await supabase
    .from("regionstatistic")
    .select("*")
    .eq("region_id", regionId)

  // let { data: regionspopulation, error } = await supabase
  //   .from("regionspopulation")
  //   .select("*")
  //   .eq("region_id", regionId)

  // console.log("population: ", regionspopulation)
  console.log("error: ", error)

  return (
    <div>
      <h1>{region}</h1>
      {/* <pre>
        Средняя численность населения:{" "}
        {JSON.stringify(regionspopulation, null, 2)}
      </pre> */}
      <pre>{JSON.stringify(regionstatistic, null, 2)}</pre>
    </div>
  )
}
