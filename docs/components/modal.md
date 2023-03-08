# Card

<ClientOnly>
<DemoContainer class="standard-body" style="background-color: var(--color-bg)">
  <Button
    @click="() => modal.show()"
  >
    Open Modal
  </Button>
  <ModalReport
    ref="modal"
    itemType="project"
  />
</DemoContainer>
</ClientOnly>

```vue
  <ModalReport
    itemType="project"
  />
This is a modal!
```
