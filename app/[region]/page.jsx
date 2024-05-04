"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../utils/supabase/supabaseClient"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const Regions = (props) => {
  const [chartData, setChartData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  let regionId = Number(props.params.region.slice(6))

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("regionstatistic")
        .select("*")
        .eq("region_id", regionId)

      if (!error && data) {
        console.log("data: ", data)
        const transformedData = data.map((item) => ({
          x: item.year,
          y: item.population,
          name: String(item.year),
        }))
        setChartData(transformedData)
        console.log("chartData: ", chartData)
      }
      setIsLoading(false)
    }

    fetchData()
    console.log("data: ", data[0])
  }, [regionId])

  const chartOptionsPopulation = {
    chart: {
      type: "line",
    },
    title: {
      text: "Численность населения:",
    },
    xAxis: {
      title: {
        text: "",
      },
      type: "category",
    },
    yAxis: {
      title: {
        text: null, // Убираем название
      },
      labels: {
        enabled: false, // Убираем метки
      },
      gridLineWidth: 0, // Убираем линии сетки
    },
    series: [
      {
        name: "Data",
        data: chartData,
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Highcharts.numberFormat(this.y, 0, ",", " ")
          },
        },
      },
    ],
    credits: {
      enabled: false,
    },
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsPopulation}
          />
        </div>
      )}
    </div>
  )
}

export default Regions
