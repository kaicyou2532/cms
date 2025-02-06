"use client"

import { useState, useEffect } from "react"
import { Search, Upload, Edit2, Grid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MediaItem {
  id: string
  title: string
  body: string
  slug: string
  fileType: string
  fileSize: number
  dimensions: string | null
  mimeType: string
  createdAt: string
  tags: { name: string }[]
  author?: string
}

export function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchMediaItems()
  }, [])

  async function fetchMediaItems() {
    try {
      const res = await fetch("/api/media")
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      } else if (res.status === 401) {
        router.push("/login")
      }
    } catch (error) {
      console.error("Failed to fetch media items:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("このファイルを削除してもよろしいですか？")) return

    try {
      const res = await fetch(`/api/media?id=${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setSelectedItem(null)
        fetchMediaItems()
      }
    } catch (error) {
      console.error("Failed to delete media item:", error)
    }
  }

  const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex-1 overflow-hidden">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">メディア管理</h1>
          <Button className="bg-[#007B63] hover:bg-[#007B63]/90">
            <Upload className="mr-2 h-4 w-4" />
            アップロード
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="フィルター"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-500">
              {items.length}件中{filteredItems.length}件表示
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "text-[#007B63]" : "text-gray-400"}`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "text-[#007B63]" : "text-gray-400"}`}
            >
              <Grid className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      <div className="h-full overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-gray-500">読み込み中...</div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ファイル名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">形式</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">容量</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">画像サイズ</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className={`cursor-pointer border-b hover:bg-gray-50 ${
                    selectedItem?.id === item.id ? "bg-gray-50" : ""
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img src={`/api/media/${item.id}`} alt="" className="h-10 w-10 rounded object-cover" />
                      <span className="text-sm text-[#007B63]">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.mimeType}</td>
                  <td className="px-4 py-3 text-sm">{(item.fileSize / 1024).toFixed(2)} kB</td>
                  <td className="px-4 py-3 text-sm">{item.dimensions || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Right Sidebar - File Details */}
      {selectedItem && (
        <div className="w-80 border-l bg-white p-6">
          <div className="mb-6">
            <img src={`/api/media/${selectedItem.id}`} alt="" className="w-full rounded-lg object-cover" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{selectedItem.title}</h2>
              <button className="text-gray-400 hover:text-gray-600">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">作成日時</div>
                <div className="text-sm">
                  {new Date(selectedItem.createdAt).toLocaleString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">形式</div>
                <div className="text-sm">{selectedItem.mimeType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">容量</div>
                <div className="text-sm">{(selectedItem.fileSize / 1024).toFixed(2)} kB</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">画像サイズ</div>
                <div className="text-sm">{selectedItem.dimensions || "-"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">作成者</div>
                <div className="text-sm flex items-center space-x-1">
                  <span>{selectedItem.author || "システム"}</span>
                  <Edit2 className="h-3 w-3 text-gray-400" />
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">コンテンツ参照</div>
                <div className="text-sm text-[#007B63]">1件の参照</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">タグ</div>
                <button className="text-sm text-[#007B63]">
                  {selectedItem.tags.length > 0 ? selectedItem.tags.map((tag) => tag.name).join(", ") : "設定する"}
                </button>
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button variant="outline" className="flex-1">
                再アップロード
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(selectedItem.id)}>
                削除
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

