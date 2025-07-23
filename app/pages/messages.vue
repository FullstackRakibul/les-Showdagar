
<template>
  <div class="h-full flex">
    <!-- Conversations List -->
    <div class="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Messages</h2>
        <div class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input v-model="searchQuery" placeholder="Search conversations..."
            class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
        </div>
      </div>

      <div class="overflow-y-auto h-full">
        <div v-for="conversation in filteredConversations" :key="conversation.id"
          @click="selectConversation(conversation)" :class="[
            'p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
            selectedConversation?.id === conversation.id ? 'bg-primary/10 border-primary/20' : ''
          ]">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div
                class="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold">
                {{ conversation.name.charAt(0) }}
              </div>
              <div v-if="conversation.online"
                class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full">
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <h3 class="font-semibold text-gray-900 dark:text-white truncate">{{ conversation.name }}</h3>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTime(conversation.lastMessage.time)
                  }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 truncate">{{ conversation.lastMessage.text }}</p>
              <div class="flex items-center justify-between mt-1">
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ conversation.type }}</span>
                <span v-if="conversation.unread > 0"
                  class="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {{ conversation.unread }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col bg-white dark:bg-gray-800">
      <div v-if="!selectedConversation" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <MessageCircle class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Select a conversation</h3>
          <p class="text-gray-500 dark:text-gray-500">Choose a conversation from the list to start messaging</p>
        </div>
      </div>

      <div v-else class="flex-1 flex flex-col">
        <!-- Chat Header -->
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="relative">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-semibold">
                  {{ selectedConversation.name.charAt(0) }}
                </div>
                <div v-if="selectedConversation.online"
                  class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full">
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ selectedConversation.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ selectedConversation.online ? 'Online' : 'Last seen ' + formatTime(selectedConversation.lastSeen)
                  }}
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Phone class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Video class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <MoreVertical class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div v-for="message in selectedConversation.messages" :key="message.id" :class="[
            'flex',
            message.sender === 'me' ? 'justify-end' : 'justify-start'
          ]">
            <div :class="[
              'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl',
              message.sender === 'me'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            ]">
              <p class="text-sm">{{ message.text }}</p>
              <p :class="[
                'text-xs mt-1',
                message.sender === 'me' ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
              ]">
                {{ formatTime(message.time) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-3">
            <button class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Paperclip class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div class="flex-1 relative">
              <input v-model="newMessage" @keypress.enter="sendMessage" placeholder="Type a message..."
                class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
              <button
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Smile class="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <button @click="sendMessage" :disabled="!newMessage.trim()"
              class="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Send class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Search, MessageCircle, Phone, Video, MoreVertical,
  Paperclip, Smile, Send
} from 'lucide-vue-next'

const searchQuery = ref('')
const selectedConversation = ref(null)
const newMessage = ref('')

const conversations = ref([
  {
    id: 1,
    name: 'Customer Support',
    type: 'Support',
    online: true,
    unread: 2,
    lastMessage: {
      text: 'How can I help you today?',
      time: new Date(Date.now() - 30 * 60 * 1000)
    },
    lastSeen: new Date(),
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Hello! How can I help you today?',
        time: new Date(Date.now() - 60 * 60 * 1000)
      },
      {
        id: 2,
        sender: 'me',
        text: 'I have a question about my recent order',
        time: new Date(Date.now() - 45 * 60 * 1000)
      },
      {
        id: 3,
        sender: 'them',
        text: 'I\'d be happy to help! What\'s your order number?',
        time: new Date(Date.now() - 30 * 60 * 1000)
      }
    ]
  },
  {
    id: 2,
    name: 'Order Updates',
    type: 'Automated',
    online: false,
    unread: 0,
    lastMessage: {
      text: 'Your order has been shipped!',
      time: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    lastSeen: new Date(Date.now() - 60 * 60 * 1000),
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Your order #ORD-001 has been shipped!',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ]
  }
])

const filteredConversations = computed(() => {
  if (!searchQuery.value) {
    return conversations.value
  }
  return conversations.value.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectConversation = (conversation) => {
  selectedConversation.value = conversation
  conversation.unread = 0
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedConversation.value) return

  const message = {
    id: Date.now(),
    sender: 'me',
    text: newMessage.value.trim(),
    time: new Date()
  }

  selectedConversation.value.messages.push(message)
  selectedConversation.value.lastMessage = {
    text: message.text,
    time: message.time
  }

  newMessage.value = ''
}

const formatTime = (time) => {
  const now = new Date()
  const diff = now - time
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else {
    return `${days}d ago`
  }
}
</script>