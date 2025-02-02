import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">SimpleCMS</span>
            </Link>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">
              機能
            </Link>
            <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">
              リソース
            </Link>
            <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">
              料金プラン
            </Link>
            <Link href="#" className="text-sm text-gray-700 hover:text-gray-900">
              お役立ち資料
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm">
                ログイン
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="text-sm">
                お問い合わせ
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-indigo-600 text-sm hover:bg-indigo-500">無料ではじめる</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[600px] items-center justify-between py-12">
              {/* Left Column */}
              <div className="max-w-2xl">
                <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight">
                  <span className="text-indigo-600">コンテンツ管理</span>
                  <br />
                  をアップデートしよう
                </h1>
                <p className="mb-8 text-lg text-gray-600">
                  SimpleCMSはAPIベースの日本製ヘッドレスCMSです。
                  快適な管理画面により、開発・運用コストを大きく削減することで、ビジネスを加速させます。
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">クレジットカードの登録不要</p>
                  <Link href="/register">
                    <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-500 sm:w-auto">
                      無料ではじめる
                    </Button>
                  </Link>
                  <Link href="/business">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50 sm:w-auto"
                    >
                      ビジネス職向けページ
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Screenshot */}
              <div className="hidden w-[600px] lg:block">
                <div className="rounded-lg bg-gray-50 p-4 shadow-lg">
                  <img src="/placeholder.svg?height=400&width=600" alt="SimpleCMS Dashboard" className="rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

