"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Newspaper, Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react"
import { mockNews } from "@/lib/mockData"
import { useLocalStorage } from "@/hooks/useLocalStorage"

const formatDate = (value: string | number | Date) => new Date(value).toLocaleDateString("tr-TR")

export function NewsScreen() {
  const [news, setNews] = useLocalStorage("walverha_news", mockNews)
  const [newComment, setNewComment] = useState("")
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null)
  const [expandedNews, setExpandedNews] = useState<string | null>(null)

  const handleLike = (newsId: string) => {
    setNews((prevNews) => prevNews.map((item) => (item.id === newsId ? { ...item, likes: item.likes + 1 } : item)))
  }

  const handleComment = (newsId: string) => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "Sen",
      content: newComment,
      date: new Date(),
    }

    setNews((prevNews) =>
      prevNews.map((item) => (item.id === newsId ? { ...item, comments: [...item.comments, comment] } : item)),
    )

    setNewComment("")
    setSelectedNewsId(null)
  }

  return (
    <div className="p-4 pb-20 bg-gradient-to-br from-purple-50 to-purple-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-600 p-2 rounded-full">
          <Newspaper className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-purple-900">Haberler & Gelecek</h1>
      </div>

      {/* News Feed */}
      <div className="space-y-4">
        {news.map((newsItem) => (
          <Card key={newsItem.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg text-purple-900">{newsItem.title}</CardTitle>
                    {newsItem.isVersionUpdate && <Badge className="bg-blue-600">Güncelleme</Badge>}
                  </div>
                  <p className="text-sm text-gray-500">{formatDate(newsItem.date)}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                {expandedNews === newsItem.id
                  ? newsItem.content
                  : newsItem.summary || `${newsItem.content.substring(0, 150)}...`}
              </p>

              {expandedNews !== newsItem.id && newsItem.content.length > 150 && (
                <Button
                  variant="link"
                  className="p-0 h-auto text-purple-600"
                  onClick={() => setExpandedNews(newsItem.id)}
                >
                  Daha Fazlasını Oku
                </Button>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(newsItem.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500"
                >
                  <Heart className="h-4 w-4" />
                  {newsItem.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNewsId(selectedNewsId === newsItem.id ? null : newsItem.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  {newsItem.comments.length}
                </Button>
              </div>

              {/* Comments Section */}
              {selectedNewsId === newsItem.id && (
                <div className="mt-4 pt-4 border-t space-y-3">
                  {/* Existing Comments */}
                  {newsItem.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{comment.userName}</span>
                        <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))}

                  {/* Add Comment */}
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Yorumunuzu yazın..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 min-h-[80px]"
                    />
                    <Button
                      onClick={() => handleComment(newsItem.id)}
                      disabled={!newComment.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Notice */}
      <Card className="mt-6">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-600">
            Admin panelinden içerik yönetimi, yorum moderasyonu ve sürüm güncellemeleri yapılabilir. Yorumlar
            silinebilir ve yorum özelliği kapatılabilir.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
