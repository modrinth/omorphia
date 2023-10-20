# Hover Cards

<DemoContainer>
<UserTooltip
  username="CodexAdrian"
  icon-url="https://avatars.githubusercontent.com/u/83074853?v=4"
  role="admin"
  bio="Lead Mod Developer for Terrarium, Member of Team AOF, and a member of the Modrinth Team."
  downloads="512000"
  followers="1200"
>
  <Button>
    <UserIcon/>
    User
  </Button>
    <template #button>
        <Button>
            <HeartIcon/>
            Follow
        </Button>
    </template>
</UserTooltip>
<OrganizationTooltip
    name="Terrarium"
    icon-url="https://cdn.modrinth.com/user/6ZoP9xY8/845ab3625ed09a90b58b4ec6089c92d8e459ca09.png"
    description="Creating cool new minecraft mods for you to enjoy!"
    downloads="11322323"
    projects="12"
    :members="[
        {
            name: 'CodexAdrian',
            icon_url: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'Kekie6',
            icon_url: 'https://avatars.githubusercontent.com/u/79649631?v=4',
        },
{
            name: 'ThatGravyBoat',
            icon_url: 'https://avatars.githubusercontent.com/u/26934102?v=4',
        },
{
            name: 'Facudo46',
            icon_url: 'https://cdn.modrinth.com/user/cA1RRKvv/8498cd7695a07b60e4a3013910a8f4f1470e02e0.png',
        },
{
            name: 'AlexNijjar',
            icon_url: 'https://avatars.githubusercontent.com/u/61668546?v=4',
        },
{
            name: 'fizziy',
            icon_url: 'https://cdn.modrinth.com/user/lM3xW2Bx/b60074b7cf3140d49f47eeee9e22f54d905b49df.png',
        },
{
            name: 'MsRandom',
            icon_url: 'https://avatars2.githubusercontent.com/u/36382780?v=4',
        },
{
            name: 'grimbodev',
            icon_url: 'https://cdn.modrinth.com/user/HZZEeRnt/c9b5d2dd411f152e18399c2982709d25e4dd3e7c.png',
        },
    ]"
>
  <Button>
    <OrganizationIcon/>
    Organization
  </Button>
    <template #button>
        <Button>
            <HeartIcon/>
            Follow
        </Button>
    </template>
</OrganizationTooltip>
<ProjectTooltip
  name="Spirit"
  author="CodexAdrian"
  icon-url="https://cdn.modrinth.com/data/b1LdOZlE/465598dc5d89f67fb8f8de6def21240fa35e3a54.png"
  description="A mod exploring soul magic in blocks, tools, weapons and more!"
  downloads="512000"
  followers="1200"
>
  <Button>
    <ListIcon/>
    Project
  </Button>
    <template #button>
        <Button>
            <HeartIcon/>
            Follow
        </Button>
    </template>
</ProjectTooltip>
<CollectionTooltip
    name="Project Odyssey"
    icon-url="https://i.imgur.com/CibR8vJ.png"
    description="A suite of useful, open source packmaker utility mods for Minecraft Forge and Fabric"
    :projects="[
        {
            title: 'Heracles',
            icon_url: 'https://cdn.modrinth.com/data/lo90fZoB/81b2b095d5570e29f29604c6c5c69eaf9f4033bc.png',
        },
        {
            title: 'Cadmus',
            icon_url: 'https://cdn.modrinth.com/data/fEWKxVzh/5d5fcff12c939097701a1c57d8c437845fc3c0f9.png',
        },
        {
            title: 'Prometheus',
            icon_url: 'https://cdn.modrinth.com/data/iYcNKH7W/45a9bd1bf6b09c0f0576a1d78d1291eceedbdb76.png',
        },
        {
            title: 'Argonauts',
            icon_url: 'https://cdn.modrinth.com/data/bb2EpKpx/a1bd657608a465ee17d88307b936eb41bcdad502.png',
        }
    ]"
>
  <Button>
    <DashboardIcon/>
    Collection
  </Button>
    <template #button>
        <Button>
            <HeartIcon/>
            Follow
        </Button>
    </template>
</CollectionTooltip>
</DemoContainer>

```vue
<UserTooltip
  username="username"
  icon-url="user's icon url"
  role="user's role (admin/moderator/developer)"
  bio="user's bio"
  downloads="number"
  followers="number"
  position="bottom/top/left/right (default: bottom)"
  direction="left/right/up/down (default: left)"
>
  <component/>
  <template #button>
    <button/>
  </template>
</UserTooltip>

<OrganizationTooltip
    name="organization name"
    icon-url="organization's icon url"
    description="organization's description"
    downloads="number"
    projects="number"
    :members="[
        {
            username: 'members username',
            icon_url: 'members icon url',
        },
        ...
    ]"
    position="bottom/top/left/right (default: bottom)"
    direction="left/right/up/down (default: left)"
>
  <component/>
  <template #button>
    <button/>
  </template>
</OrganizationTooltip>

<ProjectTooltip
  name="project name"
  author="author's username"
  icon-url="project's icon url"
  description="project's description"
  downloads="number"
  followers="number"
  position="bottom/top/left/right (default: bottom)"
  direction="left/right/up/down (default: left)"
>
  <component/>
  <template #button>
    <button/>
  </template>
</ProjectTooltip>

<CollectionTooltip
    name="collection name"
    icon-url="collection's icon url"
    description="collection's description"
    :projects="[
        {
            title: 'projects name',
            icon_url: 'projects icon url',
        },
        ...
    ]"
    position="bottom/top/left/right (default: bottom)"
    direction="left/right/up/down (default: left)"
>
  <component/>
  <template #button>
    <button/>
  </template>
</CollectionTooltip>
```
