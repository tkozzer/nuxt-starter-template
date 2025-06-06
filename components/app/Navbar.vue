<script setup lang="ts">
// Color mode composable for theme toggle
const colorMode = useColorMode();

function toggleColorMode(): void {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-black/10 dark:shadow-white/10">
    <div class="container flex h-14 max-w-screen-2xl items-center">
      <!-- Logo/Brand -->
      <div class="mr-4 hidden md:flex">
        <NuxtLink to="/" class="mr-6 flex items-center space-x-2">
          <Icon name="lucide:zap" class="h-6 w-6" />
          <span class="hidden font-bold sm:inline-block">
            Nuxt Starter Template
          </span>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <NavigationMenu class="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Features</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li class="row-span-3">
                  <NavigationMenuLink as-child>
                    <NuxtLink
                      class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      to="/"
                    >
                      <Icon name="lucide:zap" class="h-6 w-6" />
                      <div class="mb-2 mt-4 text-lg font-medium">
                        Nuxt Starter Template
                      </div>
                      <p class="text-sm leading-tight text-muted-foreground">
                        A modern template with shadcn-vue, Tailwind CSS, and TypeScript.
                      </p>
                    </NuxtLink>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <NuxtLink
                      to="/about"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        About
                      </div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Learn more about this template
                      </p>
                    </NuxtLink>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <NuxtLink
                      to="/docs"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        Documentation
                      </div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        How to use this template
                      </p>
                    </NuxtLink>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink as-child>
                    <NuxtLink
                      to="/components"
                      class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">
                        Components
                      </div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Browse available components
                      </p>
                    </NuxtLink>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <NuxtLink
                to="/blog"
                class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                Blog
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink as-child>
              <NuxtLink
                to="/users"
                class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                Users
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <!-- Mobile Menu Button -->
      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="ghost"
            class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Icon name="lucide:menu" class="h-5 w-5" />
            <span class="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="pr-0">
          <SheetHeader>
            <SheetTitle>
              <NuxtLink to="/" class="flex items-center space-x-2">
                <Icon name="lucide:zap" class="h-6 w-6" />
                <span class="font-bold">Nuxt Starter Template</span>
              </NuxtLink>
            </SheetTitle>
          </SheetHeader>
          <div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div class="flex flex-col space-y-3">
              <NuxtLink to="/about" class="text-foreground/70 transition-colors hover:text-foreground">
                About
              </NuxtLink>
              <NuxtLink to="/docs" class="text-foreground/70 transition-colors hover:text-foreground">
                Documentation
              </NuxtLink>
              <NuxtLink to="/components" class="text-foreground/70 transition-colors hover:text-foreground">
                Components
              </NuxtLink>
              <NuxtLink to="/blog" class="text-foreground/70 transition-colors hover:text-foreground">
                Blog
              </NuxtLink>
              <NuxtLink to="/users" class="text-foreground/70 transition-colors hover:text-foreground">
                Users
              </NuxtLink>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <!-- Right side items -->
      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <!-- Mobile Logo -->
        <div class="flex md:hidden">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <Icon name="lucide:zap" class="h-6 w-6" />
            <span class="font-bold">Nuxt Starter</span>
          </NuxtLink>
        </div>

        <!-- Theme Toggle and User Menu -->
        <div class="flex items-center space-x-2">
          <!-- Theme Toggle Button -->
          <Button
            variant="ghost"
            size="icon"
            @click="toggleColorMode"
          >
            <Icon
              v-if="colorMode.value === 'dark'"
              name="lucide:sun"
              class="h-4 w-4"
            />
            <Icon
              v-else
              name="lucide:moon"
              class="h-4 w-4"
            />
            <span class="sr-only">Toggle theme</span>
          </Button>

          <!-- User Profile Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                <Avatar class="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
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
                    John Doe
                  </p>
                  <p class="text-xs leading-none text-muted-foreground">
                    john.doe@example.com
                  </p>
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
              <DropdownMenuItem>
                <Icon name="lucide:credit-card" class="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icon name="lucide:log-out" class="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </nav>
</template>
