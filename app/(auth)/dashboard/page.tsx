"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Content {
  id: string
  title: string
  body: string
  slug: string
  status: string
  type: string
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "保存中..." : "コンテンツを保存"}
    </Button>
  )
}

export default function Dashboard() {
  const [contents, setContents] = useState<Content[]>([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [slug, setSlug] = useState("")
  const [status, setStatus] = useState("draft")
  const [type, setType] = useState("post")
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchContents()
  }, [])

  async function fetchContents() {
    const res = await fetch("/api/content")
    if (res.ok) {
      const data = await res.json()
      setContents(data)
    } else if (res.status === 401) {
      router.push("/login")
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const method = editingId ? "PUT" : "POST"

    const res = await fetch("/api/content", {
      method,
      body: JSON.stringify({
        id: editingId,
        title: formData.get("title"),
        body: formData.get("body"),
        slug: formData.get("slug"),
        status: formData.get("status"),
        type: formData.get("type"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.ok) {
      resetForm()
      fetchContents()
    } else if (res.status === 401) {
      router.push("/login")
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/content?id=${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      fetchContents()
    } else if (res.status === 401) {
      router.push("/login")
    }
  }

  function handleEdit(content: Content) {
    setEditingId(content.id)
    setTitle(content.title)
    setBody(content.body)
    setSlug(content.slug)
    setStatus(content.status)
    setType(content.type)
  }

  function resetForm() {
    setEditingId(null)
    setTitle("")
    setBody("")
    setSlug("")
    setStatus("draft")
    setType("post")
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">コンテンツ管理</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">タイトル</Label>
          <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="body">本文</Label>
          <Textarea id="body" name="body" value={body} onChange={(e) => setBody(e.target.value)} required rows={4} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">スラッグ</Label>
          <Input id="slug" name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">ステータス</Label>
          <Select name="status" value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">下書き</SelectItem>
              <SelectItem value="published">公開</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">タイプ</Label>
          <Select name="type" value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="post">投稿</SelectItem>
              <SelectItem value="page">ページ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <SubmitButton />
          {editingId && (
            <Button type="button" variant="outline" onClick={resetForm}>
              キャンセル
            </Button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        {contents.map((content) => (
          <div key={content.id} className="rounded-lg border p-4">
            <h2 className="mb-2 text-xl font-bold">{content.title}</h2>
            <p className="mb-2 text-gray-600">{content.body}</p>
            <div className="mb-4 space-y-1 text-sm text-gray-500">
              <p>スラッグ: {content.slug}</p>
              <p>ステータス: {content.status}</p>
              <p>タイプ: {content.type}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(content)} variant="outline" size="sm">
                編集
              </Button>
              <Button onClick={() => handleDelete(content.id)} variant="destructive" size="sm">
                削除
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

