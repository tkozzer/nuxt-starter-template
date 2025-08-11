<script setup lang="ts">
// Get auth state from our composable
const { user, isAuthenticated, logout } = useAuth();

// Computed property for user initials
const userInitials = computed(() => {
  if (!user.value?.name)
    return "U";
  return user.value.name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

// Navigation functions
function login() {
  navigateTo("/auth/login");
}

function signup() {
  navigateTo("/auth/signup");
}

// Use the logout function from our composable
async function handleLogout() {
  await logout();
}
</script>

<template>
  <div class="flex items-center space-x-2">
    <!-- Not Authenticated State -->
    <template v-if="!isAuthenticated">
      <Button
        variant="ghost"
        size="sm"
        @click="login"
      >
        Log in
      </Button>
      <Button size="sm" @click="signup">
        Sign up
      </Button>
    </template>

    <!-- Authenticated State -->
    <template v-else>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="ghost" class="relative h-8 w-8 rounded-full">
            <Avatar class="h-8 w-8">
              <AvatarImage :src="user?.image ?? ''" :alt="user?.name || 'User'" />
              <AvatarFallback>
                {{ userInitials }}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-56"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="font-normal">
            <div class="flex flex-col space-y-1">
              <p class="text-sm font-medium leading-none">
                {{ user?.name }}
              </p>
              <p class="text-xs leading-none text-muted-foreground">
                {{ user?.email }}
              </p>
              <!-- Admin Badge -->
              <Badge
                v-if="user?.admin"
                variant="secondary"
                class="w-fit mt-1"
              >
                <Icon name="lucide:shield" class="mr-1 h-3 w-3" />
                Admin
              </Badge>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon name="lucide:user" class="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="lucide:settings" class="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <!-- Admin Only Items -->
          <template v-if="user?.admin">
            <DropdownMenuItem>
              <Icon name="lucide:shield" class="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="lucide:users" class="mr-2 h-4 w-4" />
              <span>Manage Users</span>
            </DropdownMenuItem>
          </template>
          <DropdownMenuItem>
            <Icon name="lucide:credit-card" class="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogout">
            <Icon name="lucide:log-out" class="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </template>
  </div>
</template>
