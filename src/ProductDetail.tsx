import { useParams, Link } from "react-router-dom"

type Product = {
  id: number
  name: string
  category: string
  company: string
  country: string
  volume: string
  price_min: number
  price_max: number
  image: string
}

type Props = {
  products: Product[]
}

export default function ProductDetail({ products }: Props) {
  const { id } = useParams()

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return <div className="p-8">商品が見つかりません</div>
  }
const countryLabelMap: Record<string, string> = {
  Korea: "韓国",
  Japan: "日本",
  Germany: "ドイツ",
  France: "フランス",
  Italy: "イタリア",
  USA: "アメリカ",
  UK: "イギリス",
  Switzerland: "スイス",
  Denmark: "デンマーク",
  Luxembourg: "ルクセンブルク",
  Turkey: "トルコ",
  India: "インド",
  Pakistan: "パキスタン",
  India: "インド",
};

  const formatPrice = (min: number, max: number) =>
    min === max
      ? `¥${min.toLocaleString()}`
      : `¥${min.toLocaleString()}〜¥${max.toLocaleString()}`

  return (
    <div className="p-8">
      <Link to="/" className="text-blue-600 underline">← 戻る</Link>

      <div className="mt-6 bg-white p-6 rounded-xl shadow">
        <img src={product.image} className="w-full h-64 object-cover mb-4 rounded" />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p>会社：{product.company}</p>
        <p>国：{countryLabelMap[product.country] || product.country}</p>
        <p>容量：{product.volume}</p>
        <p className="text-xl font-bold text-blue-700 mt-4">
          {formatPrice(product.price_min, product.price_max)}
        </p>
      </div>
    </div>
  )
}
