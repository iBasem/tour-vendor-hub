
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreHorizontal, Phone, Video } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Lucas Murphy",
    message: "I have some dietary restrictions that I need to share with you that the mention bot...",
    time: "2:30 PM",
    avatar: "/placeholder.svg",
    unread: true,
    online: true
  },
  {
    id: 2,
    name: "Alexandra Green",
    message: "Our university is interested in organizing a corporate retreat with fr...",
    time: "12:45 PM",
    avatar: "/placeholder.svg",
    unread: true,
    online: false
  },
  {
    id: 3,
    name: "David Hernandez",
    message: "I wanted like to inquire my current booking for the Venice package.",
    time: "Yesterday",
    avatar: "/placeholder.svg",
    unread: false,
    online: false
  },
  {
    id: 4,
    name: "Melinda Jenkins",
    message: "Can you provide some details on the tour we have booked with...",
    time: "Yesterday",
    avatar: "/placeholder.svg",
    unread: false,
    online: true
  },
  {
    id: 5,
    name: "Kalendra Umbara",
    message: "Hi, I need assistance with changing my travel dates for the Tokyo Cultural Exp...",
    time: "Yesterday",
    avatar: "/placeholder.svg",
    unread: false,
    online: false
  },
];

const currentMessages = [
  {
    id: 1,
    sender: "Lucas Murphy",
    message: "I have some dietary restrictions that I need to share with you that the mention bot...",
    time: "2:30 PM",
    isMe: false
  },
  {
    id: 2,
    sender: "You",
    message: "Of course! I'd be happy to help with your dietary restrictions. Could you please let me know what specific requirements you have?",
    time: "2:32 PM",
    isMe: true
  },
  {
    id: 3,
    sender: "Lucas Murphy",
    message: "I'm vegetarian and also have a gluten allergy. Will this be accommodated during the tour?",
    time: "2:35 PM",
    isMe: false
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card>
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 cursor-pointer hover:bg-gray-50 border-l-4 ${
                    selectedConversation.id === conversation.id 
                      ? "border-blue-600 bg-blue-50" 
                      : "border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium truncate">{conversation.name}</h4>
                        <span className="text-xs text-gray-500">{conversation.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">{conversation.message}</p>
                    </div>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                  </Avatar>
                  {selectedConversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.online ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Chat Messages */}
          <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.isMe
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <span className={`text-xs mt-1 block ${
                    message.isMe ? "text-blue-100" : "text-gray-500"
                  }`}>
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
