# Share Modal

<DemoContainer>
  <Button @click="$refs.shareContent.show('This is content')">
    <EditIcon/>
    Share Content
  </Button>
  <Button @click="$refs.shareLink.show('https://modrinth.com')">
    <GlobeIcon/>
    Share Link
  </Button>
  <ShareModal
    ref="shareContent"
    share-title="This is the title for the content"
    share-content="Share this content"
  />
  <ShareModal
    ref="shareLink"
    share-title="This is the title for the link"
    share-content="Share this link"
    link
  />
</DemoContainer>

```vue
  <ShareModal
    ref="shareContent"
    share-title="This is the title for the content"
    share-content="Share this content"
  />
  <ShareModal
    ref="shareLink"
    share-title="This is the title for the link"
    share-content="Share this link"
    link
  />

```
You can use ref to open the modal, calling the show method

`content` is what will be shown in the text of the input for sharing
```text
$refs.shareContent.show(content)
```
