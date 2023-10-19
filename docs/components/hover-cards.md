# Hover Cards

<DemoContainer>
<UserTooltip
  name="CodexAdrian"
  icon="https://avatars.githubusercontent.com/u/83074853?v=4"
  role="admin"
  bio="Lead Mod Developer for Terrarium, Member of Team AOF, and a member of the Modrinth Team."
  :stats="[
    {
      label: 'Followers',
      value: 0
    },
    {
      label: 'Projects',
      value: 0
    } 
  ]"
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
    icon="https://cdn.modrinth.com/user/6ZoP9xY8/845ab3625ed09a90b58b4ec6089c92d8e459ca09.png"
    :isUser="false"
    bio="Creating cool new minecraft mods for you to enjoy!"
    :stats="[
        {
            label: 'Followers',
            value: 0
        },
        {
            label: 'Projects',
            value: 0
        }  
    ]"
    :members="[
        {
            name: 'CodexAdrian',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'CodexAlex',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'CodexGravy',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'CodexAdrian',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'CodexAlex',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'CodexGravy',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'CodexAdrian',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'CodexAlex',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        },
{
            name: 'CodexGravy',
            icon: 'https://avatars.githubusercontent.com/u/83074853?v=4',
        }
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
  icon="https://cdn.modrinth.com/data/b1LdOZlE/465598dc5d89f67fb8f8de6def21240fa35e3a54.png"
  role="admin"
  bio="A mod exploring soul magic in blocks, tools, weapons and more!"
  :stats="[
    {
      label: 'Followers',
      value: 0
    },
    {
      label: 'Projects',
      value: 0
    } 
  ]"
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
    icon="https://i.imgur.com/CibR8vJ.png"
    :isUser="false"
    bio="A suite of useful, open source packmaker utility mods for Minecraft Forge and Fabric"
    :projects="[
        {
            name: 'Heracles',
            icon: 'https://cdn.modrinth.com/data/lo90fZoB/81b2b095d5570e29f29604c6c5c69eaf9f4033bc.png',
        },
        {
            name: 'Cadmus',
            icon: 'https://cdn.modrinth.com/data/fEWKxVzh/5d5fcff12c939097701a1c57d8c437845fc3c0f9.png',
        },
        {
            name: 'Prometheus',
            icon: 'https://cdn.modrinth.com/data/iYcNKH7W/45a9bd1bf6b09c0f0576a1d78d1291eceedbdb76.png',
        },
        {
            name: 'Argonauts',
            icon: 'https://cdn.modrinth.com/data/bb2EpKpx/a1bd657608a465ee17d88307b936eb41bcdad502.png',
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

<Hoverable>
  <Button>
    <UserIcon/>
    User
  </Button>
  <UserTooltip
      :user="{}"
      slot="tooltip"
  />
</Hoverable>
```
