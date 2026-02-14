import { useState, useEffect } from "react"
import { Routes, Route, Link } from "react-router-dom"
import ProductDetail from "./ProductDetail"

type Product = {
  id: number;
  name: string;
  category: string;
  company: string;
  country: string;
  volume: string;
  price_min: number;
  price_max: number;
  image: string;
};

export default function App() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [sortType, setSortType] = useState("name")
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountryGroup, setSelectedCountryGroup] = useState("")


  // データ取得
  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycby7yB37ORZ8lB7LSKRrkp6P5d8kqkLfHv26R0plZ1-Y32643qx5W4cMzI_uNxr3HU1P/exec")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, [])

  // 価格表示用関数
  const formatPrice = (min: number, max: number) =>
    min === max
      ? `¥${min.toLocaleString()}`
      : `¥${min.toLocaleString()}〜¥${max.toLocaleString()}`
// ===== 国フィルター =====
const countryFilteredProducts = products.filter(p => {
  if (!selectedCountryGroup) return true

  if (selectedCountryGroup === "korea") {
    return p.country === "Korea" || p.country === "韓国"
  }

  if (selectedCountryGroup === "japan") {
    return p.country === "Japan" || p.country === "日本"
  }

  if (selectedCountryGroup === "other") {
    return (
      p.country !== "Korea" &&
      p.country !== "韓国" &&
      p.country !== "Japan" &&
      p.country !== "日本"
    )
  }

  return true
})

  // 検索・カテゴリフィルター
  const filteredProducts = countryFilteredProducts
  .filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.company.toLowerCase().includes(search.toLowerCase())
  )
  .filter(p => selectedCategory ? p.category === selectedCategory : true)

    .filter(p =>
  p.name.toLowerCase().includes(search.toLowerCase()) ||
  p.company.toLowerCase().includes(search.toLowerCase())
)
    .filter(p => selectedCategory ? p.category === selectedCategory : true)

  // 名前でソート
  const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortType === "priceLow") return a.price_min - b.price_min
  if (sortType === "priceHigh") return b.price_min - a.price_min
  return a.name.localeCompare(b.name, "ja")
})

const categories = Array.from(
  new Set(products.map(p => p.category))
)
const categoryLabelMap: Record<string, string> = {
  Botox: "ボトックス",
  filler: "ヒアルロン酸",
  IVdrip: "点滴製剤",
  Skinbooster: "スキンブースター",
  lipodissolve: "脂肪溶解注射",
  obesitymedication: "痩身関連",
  hyaluronidase: "ヒアルロン酸溶解",
  threadLift: "糸リフト",
  shoppingLift: "ショッピングリフト",
  PDLLAPLLA: "PDLLA/PLLA",
  exfoliant: "ピーリング",
  anesthesia: "麻酔関連",
  cannula: "カニューレ",
  placenta: "プラセンタ注射",
  Dermatological: "皮膚系製剤",
  Gynecology: "婦人科系薬剤",
  Mens: "メンズヘルス系薬剤",
  STISTD: "性感染症系薬剤",
  Smokingcessation: "禁煙系薬剤",
  Hairloss: "頭髪系薬剤",
  sexualfunction: "性機能系薬剤",
  infertility: "不妊系薬剤",
};

  return (
    <Routes>
<Route
  path="/"
  element={
    <div className="min-h-screen bg-gray-100">

      {/* ===== 固定ヘッダー ===== */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    {/* 左：ロゴ＋タイトル */}
    <Link to="/" className="flex items-center gap-3">
      <img
        src="/logo.png"
        alt="Company Logo"
        className="h-9 w-auto object-contain"
      />
      <span className="text-xl font-bold text-blue-900 tracking-tight">
        製剤価格管理システム
      </span>
    </Link>

    {/* 右：将来拡張エリア */}
    <div className="w-10"></div>

  </div>
</div>


      {/* ===== メインコンテンツ ===== */}
      <div className="max-w-7xl mx-auto p-8">

        {/* 検索＋ソート */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="商品名で検索"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="name">アルファベット順</option>
              <option value="priceLow">価格：安い順</option>
              <option value="priceHigh">価格：高い順</option>
            </select>
          </div>
        </div>
        {/* ===== 国フィルター ===== */}
<div className="flex flex-wrap gap-3 mb-6">
    <button
    onClick={() => setSelectedCountryGroup("")}
    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
      selectedCountryGroup === ""
        ? "bg-gray-700 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    全て
  </button>
  <button
    onClick={() => setSelectedCountryGroup("korea")}
    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
      selectedCountryGroup === "korea"
        ? "bg-green-700 text-white"
        : "bg-green-100 text-green-800 hover:bg-green-200"
    }`}
  >
    韓国
  </button>

  <button
    onClick={() => setSelectedCountryGroup("japan")}
    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
      selectedCountryGroup === "japan"
        ? "bg-red-700 text-white"
        : "bg-red-100 text-red-800 hover:bg-red-200"
    }`}
  >
    日本
  </button>

  <button
    onClick={() => setSelectedCountryGroup("other")}
    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
      selectedCountryGroup === "other"
        ? "bg-purple-700 text-white"
        : "bg-purple-100 text-purple-800 hover:bg-purple-200"
    }`}
  >
    その他
  </button>
</div>

{/* カテゴリ */}
<div className="flex flex-wrap gap-3 mb-8">
  {categories.map(cat => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
        selectedCategory === cat
          ? "bg-blue-800 text-white"
          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
      }`}
    >
      {categoryLabelMap[cat] || cat}
    </button>
  ))}

  <button
    onClick={() => setSelectedCategory("")}
    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
      selectedCategory === ""
        ? "bg-blue-800 text-white"
        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
    }`}
  >
    全て
  </button>
</div>


        {/* 商品グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  {product.company}
                </p>

                <p className="text-xl font-bold text-blue-800">
                  {formatPrice(product.price_min, product.price_max)}
                </p>
              </div>
            </Link>
          ))}
        </div>
{/* ===== ご利用案内（折りたたみ） ===== */}
<div className="mt-24 border-t border-gray-300 pt-8">

  <div className="max-w-4xl mx-auto">

    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex justify-between items-center text-left text-xl font-bold text-gray-800"
    >
      ご利用条件・納期・配送について
      <span className="text-sm">
        {isOpen ? "▲ 閉じる" : "▼ 詳細を見る"}
      </span>
    </button>

    {isOpen && (
      <div className="mt-8 space-y-10 text-sm text-gray-700 leading-relaxed">

        <div>
          <h3 className="font-semibold mb-2">■ ご利用条件・費用について</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>輸入関連税金等：商品代金の約10％</li>
            <li>送料：物量により変動</li>
            <li>物流手配サービス料：商品代金の1％</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">■ 納期目安</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>韓国製剤：2〜4週間</li>
            <li>ヨーロッパ製剤等：4〜6週間</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">■ 配送について</h3>
          <p>
            韓国から日本税関到着まで約10日、クリニック様到着まで約3〜4週間が目安です。
          </p>
        </div>

      </div>
    )}

  </div>
</div>


      </div>
    </div>
  }
/>


      {/* 商品詳細ページ */}
      <Route
  path="/product/:id"
  element={<ProductDetail products={products} />}
/>

    </Routes>
  )
}
