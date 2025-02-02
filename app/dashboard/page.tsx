"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [contents, setContents] = useState([])
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [slug, setSlug] = useState("")
  const [status, setStatus] = useState("draft")
  const [type, setType] = useState("post")
  const [editingId, setEditingId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchContents()
  }, [])

  async function fetchContents() {
    const res = await fetch("/api/content", {
      headers: { "x-api-key": localStorage.getItem("apiKey") || "" },
    })
    if (res.ok) {
      setContents(await res.json())
    } else {
      router.push("/login")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const method = editingId ? "PUT" : "POST"
    const body = JSON.stringify({ id: editingId, title, body, slug, status, type })
    const res = await fetch("/api/content", {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage.getItem("apiKey") || "",
      },
      body,
    })
    if (res.ok) {
      resetForm()
      fetchContents()
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/content?id=${id}`, {
      method: "DELETE",
      headers: { "x-api-key": localStorage.getItem("apiKey") || "" },
    })
    if (res.ok) {
      fetchContents()
    }
  }

  function handleEdit(content: any) {
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
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">Content Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border border-blue-200 rounded"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Content"
          className="w-full p-2 mb-4 border border-blue-200 rounded"
          rows={4}
        />
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="Slug"
          className="w-full p-2 mb-4 border border-blue-200 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 mb-4 border border-blue-200 rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 mb-4 border border-blue-200 rounded"
        >
          <option value="post">Post</option>
          <option value="page">Page</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editingId ? "Update" : "Add"} Content
        </button>
        {editingId && (
          <button onClick={resetForm} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        )}
      </form>
      <div>
        {contents.map((content: any) => (
          <div key={content.id} className="mb-4 p-4 border border-blue-200 rounded">
            <h2 className="text-xl font-bold mb-2">{content.title}</h2>
            <p className="mb-2">{content.body}</p>
            <p className="text-sm text-gray-500">Slug: {content.slug}</p>
            <p className="text-sm text-gray-500">Status: {content.status}</p>
            <p className="text-sm text-gray-500">Type: {content.type}</p>
            <button
              onClick={() => handleEdit(content)}
              className="mt-2 bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(content.id)}
              className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

