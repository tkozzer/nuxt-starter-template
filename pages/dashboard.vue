<script setup lang="ts">
// Check if user is authenticated
const { user, isAuthenticated, logout } = useAuth();

// Redirect to login if not authenticated
if (!isAuthenticated.value) {
  await navigateTo("/auth/login");
}

// Page meta
definePageMeta({
  title: "Dashboard",
});

// Handle logout
async function handleLogout() {
  await logout();
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p class="text-muted-foreground mt-1">
            Welcome back, {{ user?.name }}!
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <Button variant="outline" @click="handleLogout">
            <Icon name="lucide:log-out" class="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>

      <!-- Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- User Info Card -->
        <ShadowCard>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div>
                <label class="text-sm font-medium text-muted-foreground">Name</label>
                <p class="text-foreground">
                  {{ user?.name }}
                </p>
              </div>
              <div>
                <label class="text-sm font-medium text-muted-foreground">Email</label>
                <p class="text-foreground">
                  {{ user?.email }}
                </p>
              </div>
              <div>
                <label class="text-sm font-medium text-muted-foreground">Role</label>
                <Badge variant="secondary">
                  {{ user?.admin ? 'Admin' : 'User' }}
                </Badge>
              </div>
            </div>
          </CardContent>
        </ShadowCard>

        <!-- Quick Actions Card -->
        <ShadowCard>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <Button
                v-if="user?.admin"
                variant="outline"
                class="w-full justify-start"
                @click="navigateTo('/users')"
              >
                <Icon name="lucide:users" class="mr-2 h-4 w-4" />
                View Users
              </Button>
              <Button variant="outline" class="w-full justify-start">
                <Icon name="lucide:settings" class="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="outline" class="w-full justify-start">
                <Icon name="lucide:help-circle" class="mr-2 h-4 w-4" />
                Help & Support
              </Button>
            </div>
          </CardContent>
        </ShadowCard>

        <!-- Stats Card -->
        <ShadowCard>
          <CardHeader>
            <CardTitle>Account Stats</CardTitle>
            <CardDescription>Your account overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Account Type</span>
                <span class="text-sm font-medium">
                  {{ user?.admin ? 'Administrator' : 'Standard User' }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Email Verified</span>
                <Badge :variant="user?.emailVerified ? 'default' : 'destructive'">
                  {{ user?.emailVerified ? 'Verified' : 'Unverified' }}
                </Badge>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-muted-foreground">Member Since</span>
                <span class="text-sm font-medium">
                  {{ user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A' }}
                </span>
              </div>
            </div>
          </CardContent>
        </ShadowCard>
      </div>

      <!-- Navigation Card -->
      <ShadowCard class="mt-6">
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
          <CardDescription>Explore other parts of the application</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" @click="navigateTo('/')">
              <Icon name="lucide:home" class="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button variant="outline" @click="navigateTo('/about')">
              <Icon name="lucide:info" class="mr-2 h-4 w-4" />
              About
            </Button>
            <Button
              v-if="user?.admin"
              variant="outline"
              @click="navigateTo('/users')"
            >
              <Icon name="lucide:users" class="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </div>
        </CardContent>
      </ShadowCard>
    </div>
  </div>
</template>
