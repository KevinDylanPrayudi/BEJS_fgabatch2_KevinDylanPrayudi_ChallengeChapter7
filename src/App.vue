<script>
import './style.css'

export default {
  data() {
    return {
      showNotifications: false,
      notifications: [
        { message: 'Password has changed', read: false },
        { message: 'Notification 2', read: true },
        { message: 'Notification 3', read: false }
      ]
    }
  },
  computed: {
    unreadCount() {
      return this.notifications.filter(notification => notification.read === false).length
    }
  },
  methods: {
    toggleNotifications() {
      this.showNotifications = !this.showNotifications
      console.log(`notification toggle has treggired`)
    },
    markAsRead(notification) {
      notification.read = true
    }
  }
}
</script>

<template>
  <nav>
    <div class="navbar bg-green-100 flex justify-between px-12">
      <a class="btn btn-ghost text-xl" v-if="$route.path !== '/login'" href="/dashboard">Challenge Chapter 7</a>
      <a class="btn btn-ghost text-xl" v-else href="#">Challenge Chapter 7</a>
      <div v-if="$route.path !== '/login', $route.path !== '/registration' && $route.path !== '/reset-password' && $route.path !== '/forgot-password'">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost rounded-btn"><b>{{ $cookies.get('email')
            || $store.state.username }}</b></div>
          <ul tabindex="0" id="dropdown-item"
            class="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
          </ul>
        </div>

        <div class="relative" v-if="$route.path !== '/login' &&  $route.path !== '/registration' && $route.path !== '/reset-password' && $route.path !== '/forgot-password'">
          <button
            class="flex justify-center items-center w-10 h-10 hover:bg-gray-300 rounded-full cursor-pointer"
            @click="toggleNotifications">
            <font-awesome-icon :icon="['fas', 'bell']" />
            <span v-if="unreadCount > 0"
              class="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white flex justify-center items-center">
              {{ $store.state.notifications }}
            </span>
          </button>
          <div v-if="showNotifications" class="absolute top-10 right-0 mt-2 mr-2 bg-white rounded shadow-md w-64">
            <ul>
              <li v-for="(notification, index) in notifications" :key="index"
                class="py-2 px-4 border-b border-gray-200">
                <div class="flex justify-between items-center">
                  <span>{{ notification.message }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
