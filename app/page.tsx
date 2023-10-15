import Image from "next/image"
import styles from "./page.module.css"
import { MapCountry } from "@/components/MapCountry"
import { Header } from "@/components/Header"

export default function Home() {
  return (
    <div>
      <Header />
      <MapCountry />
    </div>
  )
}
