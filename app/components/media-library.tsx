"use client"

import { useState, useEffect } from "react"
import { Search, Upload, Trash2, Edit2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MediaItem {
  id: string
  title: string
  type: string
  fileType: string
  fileSize: number
  dimensions?: string
  tags: { name: string }[]
  createdAt: string
}

export function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  async function fetchMedia() {
    const res = await fetch("/api/content?type=media")
    if (res.ok) {
      const data = await res.json()
      setItems(data)
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || item.fileType === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-white p-4">
        <h2 className="mb-4 text-lg font-semibold text-sky-600">ファイルタイプ</h2>
        <nav className="space-y-2">
          <button
            className={`w-full rounded-lg p-2 text-left hover:bg-sky-50 ${
              selectedType === "all" ? "bg-sky-100 text-sky-600" : ""
            }`}
            onClick={() => setSelectedType("all")}
          >
            すべてのファイル
          </button>
          <button
            className={`w-full rounded-lg p-2 text-left hover:bg-sky-50 ${
              selectedType === "image" ? "bg-sky-100 text-sky-600" : ""
            }`}
            onClick={() => setSelectedType("image")}
          >
            画像
          </button>
          <button
            className={`w-full rounded-lg p-2 text-left hover:bg-sky-50 ${
              selectedType === "video" ? "bg-sky-100 text-sky-600" : ""
            }`}
            onClick={() => setSelectedType("video")}
          >
            動画
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="border-b bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative w-96">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="ファイルを検索"
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="タイプで絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="image">画像</SelectItem>
                  <SelectItem value="video">動画</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-sky-500 hover:bg-sky-600">
              <Upload className="mr-2 h-4 w-4" />
              アップロード
            </Button>
          </div>
        </div>

        {/* Grid View */}
        <div className="grid h-full grid-cols-4 gap-4 overflow-y-auto p-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative cursor-pointer rounded-lg border bg-white p-2 hover:border-sky-500 ${
                selectedItem?.id === item.id ? "border-sky-500" : ""
              }`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                {item.fileType === "image" && (
                  <img src={`/api/media/${item.id}`} alt={item.title} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="mt-2">
                <h3 className="truncate text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="absolute right-2 top-2 hidden space-x-1 group-hover:flex">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      {selectedItem && (
        <div className="w-80 border-l bg-white p-4">
          <h2 className="mb-4 text-lg font-semibold text-sky-600">ファイル詳細</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">タイトル</label>
              <p className="text-sm">{selectedItem.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">タイプ</label>
              <p className="text-sm">{selectedItem.fileType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">サイズ</label>
              <p className="text-sm">{(selectedItem.fileSize / 1024).toFixed(2)} KB</p>
            </div>
            {selectedItem.dimensions && (
              <div>
                <label className="text-sm font-medium text-gray-500">寸法</label>
                <p className="text-sm">{selectedItem.dimensions}</p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">タグ</label>
              <div className="mt-1 flex flex-wrap gap-1">
                {selectedItem.tags.map((tag) => (
                  <span key={tag.name} className="rounded-full bg-sky-100 px-2 py-1 text-xs text-sky-600">
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

