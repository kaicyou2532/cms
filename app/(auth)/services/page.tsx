"use client"

import { useState } from "react"
import { Search, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Service {
  id: string
  name: string
  serviceId: string
  createdAt: string
  status: "稼働中" | "停止中" | "準備中"
}

export default function ServicesPage() {
  const [services] = useState<Service[]>([
    {
      id: "1",
      name: "OptimusInteractive",
      serviceId: "imaaim",
      createdAt: "3ヶ月前",
      status: "稼働中",
    },
  ])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">サービス管理</h1>
        <Button className="bg-[#6366F1] hover:bg-[#6366F1]/90">
          <Plus className="mr-2 h-4 w-4" />
          追加
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="検索..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-lg border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">サービス名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">サービスID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">メンバー</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">作成日時</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded bg-[#007B63]/10 p-2">
                        <div className="h-full w-full rounded-sm bg-[#007B63]" />
                      </div>
                      <span className="font-medium">{service.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{service.serviceId}</td>
                  <td className="px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{service.createdAt}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                      {service.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

