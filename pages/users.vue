<script setup lang="ts">
import type { User } from "@schemas";

type ApiResponse = {
  success: boolean;
  data: User[];
  count: number;
};

// Fetch users from API
const { data, pending, error, refresh } = await useFetch<ApiResponse>("/api/users");

// Format date for display
function formatDate(date: Date | string) {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Seed users function (you can remove this if you don't want the button)
async function seedUsers() {
  try {
    // This would call your seeding endpoint if you create one
    await $fetch("/api/seed/users", { method: "POST" });
    await refresh();
  }
  catch (err) {
    console.error("Failed to seed users:", err);
    // You could show a toast notification here
  }
}

// Page meta
useHead({
  title: "Users - Nuxt Starter",
  meta: [
    {
      name: "description",
      content: "View all registered users in the system",
    },
  ],
});
</script>

<template>
  <div class="container mx-auto py-8 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">
        Users
      </h1>
      <p class="text-muted-foreground">
        All registered users in the system
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      <span class="ml-3 text-muted-foreground">Loading users...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-destructive mb-4">
        <Icon name="lucide:alert-circle" class="h-12 w-12 mx-auto mb-2" />
        <h3 class="text-lg font-semibold">
          Failed to load users
        </h3>
        <p class="text-sm text-muted-foreground">
          {{ error.message || 'An error occurred while fetching users' }}
        </p>
      </div>
      <Button variant="outline" @click="refresh()">
        <Icon name="lucide:refresh-cw" class="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>

    <!-- Users Grid -->
    <div v-else-if="data?.data && data.data.length > 0" class="space-y-6">
      <div class="flex items-center justify-between">
        <p class="text-sm text-muted-foreground">
          Showing {{ data.count }} user{{ data.count !== 1 ? 's' : '' }}
        </p>
        <Button
          variant="outline"
          size="sm"
          @click="refresh()"
        >
          <Icon name="lucide:refresh-cw" class="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="user in data.data"
          :key="user.id"
          class="overflow-hidden"
        >
          <CardContent class="p-6">
            <div class="flex items-start space-x-4">
              <!-- Avatar -->
              <div class="flex-shrink-0">
                <img
                  v-if="user.avatar"
                  :src="user.avatar"
                  :alt="`${user.name}'s avatar`"
                  class="h-12 w-12 rounded-full object-cover"
                >
                <div
                  v-else
                  class="h-12 w-12 rounded-full bg-muted flex items-center justify-center"
                >
                  <Icon name="lucide:user" class="h-6 w-6 text-muted-foreground" />
                </div>
              </div>

              <!-- User Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                  <h3 class="text-sm font-medium truncate">
                    {{ user.name }}
                  </h3>
                  <Badge
                    v-if="user.emailVerified"
                    variant="secondary"
                    class="text-xs"
                  >
                    <Icon name="lucide:check-circle" class="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                <p class="text-sm text-muted-foreground truncate mb-3">
                  {{ user.email }}
                </p>

                <div class="text-xs text-muted-foreground">
                  <p>Joined {{ formatDate(user.createdAt) }}</p>
                  <p v-if="user.updatedAt !== user.createdAt">
                    Updated {{ formatDate(user.updatedAt) }}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Icon name="lucide:users" class="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 class="text-lg font-semibold mb-2">
        No users found
      </h3>
      <p class="text-sm text-muted-foreground mb-6">
        There are no users in the database yet.
      </p>
      <Button variant="outline" @click="seedUsers()">
        <Icon name="lucide:database" class="h-4 w-4 mr-2" />
        Seed Sample Users
      </Button>
    </div>
  </div>
</template>
