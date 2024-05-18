"use client"

import { useState, useEffect } from "react"
import { supabase } from "../../utils/supabase/supabaseClient"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const Regions = (props) => {
  const [populationData, setPopulationData] = useState([])
  const [growthData, setGrowthData] = useState([])
  const [percentageData, setPercentageData] = useState([])
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
        const transformedPopulationData = data.map((item) => ({
          x: item.year,
          y: item.population,
          name: String(item.year),
        }))
        const transformedGrowthData = data.map((item) => ({
          x: item.year,
          y: item.growth,
          name: String(item.year),
        }))
        const transformedPercentageData = data.map((item) => ({
          x: item.year,
          y: item.percentage_of_the_urban_population,
          name: String(item.year),
        }))
        setPopulationData(transformedPopulationData)
        setGrowthData(transformedGrowthData)
        setPercentageData(transformedPercentageData)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [regionId])

  const chartOptionsPopulation = {
    chart: {
      type: "line",
    },
    title: {
      text: "Численность постоянного населения в среднем за год:",
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
        data: populationData,
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
  const chartOptionsGrowth = {
    chart: {
      type: "column",
    },
    title: {
      text: "Общий прирост постоянного населения:",
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
        data: growthData,
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

  const chartOptionsPercentage = {
    chart: {
      type: "column",
    },
    title: {
      text: "Общий прирост постоянного населения:",
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
        data: percentageData,
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
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsGrowth}
          />
          {/* <HighchartsReact
            highcharts={Highcharts}
            options={chartOptionsPercentage}
          /> */}
        </div>
      )}
    </div>
  )
}

export default Regions
