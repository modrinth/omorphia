# Card
:::raw
<ClientOnly>
  <DemoContainer>
    <ModalReport ref="reportModal" :reportTypes="['spam', 'copyright', 'inappropriate', 'malicious']" />
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
