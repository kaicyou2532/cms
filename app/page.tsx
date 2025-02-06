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
              <span className="text-xl font-bold text-primary">OptimusCMS</span>
            </Link>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <Link href="#" className="text-sm text-gray-700 hover:text-primary">
              機能
            </Link>
            <Link href="#" className="text-sm text-gray-700 hover:text-primary">
              リソース
            </Link>
            <Link href="#" className="text-sm text-gray-700 hover:text-primary">
              料金プラン
            </Link>
            <Link href="#" className="text-sm text-gray-700 hover:text-primary">
              お役立ち資料
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm text-primary hover:bg-primary/10">
                ログイン
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="text-sm border-primary text-primary hover:bg-primary/10">
                お問い合わせ
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-primary text-sm hover:bg-primary/90 text-white">無料ではじめる</Button>
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
                  <span className="text-primary">OptimusCMS</span>
                  <br />
                  でコンテンツ管理を
                  <br />
                  最適化
                </h1>
                <p className="mb-8 text-lg text-gray-600">
                  OptimusCMSはAPIベースのかいちょう製ヘッドレスCMSです。
                  最適化された管理画面も全部無料。
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500"></p>
                  <Link href="/register">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white sm:w-auto">
                      無料ではじめる
                    </Button>
                  </Link>
                  <Link href="/business">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary/10 sm:w-auto"
                    >
                      ビジネス職向けページ
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Screenshot */}
              <div className="hidden w-[600px] lg:block">
                <div className="rounded-lg bg-gray-50 p-4 shadow-lg">
                  <img src="/placeholder.svg?height=400&width=600" alt="OptimusCMS Dashboard" className="rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

