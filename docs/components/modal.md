# Card
:::raw
<ClientOnly>
  <DemoContainer>
    <ModalReport ref="reportModal" :reportTypes="['cringitude', 'rudeness', 'notgamer', 'windowsuser']" />
    <Button :action="() => this.$refs.reportModal.modal.show()">Show Modal</Button>
</DemoContainer>
</ClientOnly>
:::

```vue
  <ModalReport
    itemType="project"
  />
This is a modal!
```
