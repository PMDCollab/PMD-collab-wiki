import { XMLParser } from "fast-xml-parser"
import { utils } from "pixi.js"
import { useEffect, useState } from "react"
import { IAnimData, IPMDCollab } from "../types/enum"

export const useAnimData = (url: string) => {
  const [data, setData] = useState<IAnimData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const parser = new XMLParser()
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      utils.clearTextureCache()
      try {
        const response = await fetch(url)
        const text = await response.text()
        const parsed = parser.parse(text) as IPMDCollab
        setData(parsed.AnimData)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])
  return { data, isLoading }
}
