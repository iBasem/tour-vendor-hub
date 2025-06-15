
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";

export default function Messages() {
  const conversations = [
    {
      id: 1,
      traveler: "John Smith",
      lastMessage: "Thank you for the booking confirmation!",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      traveler: "Sarah Johnson",
      lastMessage: "Can I modify my travel dates?",
      time: "1 day ago",
      unread: false
    },
    {
      id: 3,
      traveler: "Mike Wilson",
      lastMessage: "The trip was amazing, thank you!",
      time: "3 days ago",
      unread: false
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Messages & Communication</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    conversation.unread ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium">{conversation.traveler}</p>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Chat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
