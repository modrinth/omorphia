# Card
:::raw

<DemoContainer>
  <Button :action="() => this.$refs.reportModal.modal.show()">Show Modal</Button>
  <ModalReport
  ref="reportModal"
  :reportTypes="['cringitude', 'rudeness', 'notgamer', 'windowsuser']"
  >
  </ModalReport>
</DemoContainer>
:::

```vue
  <ModalReport
    itemType="project"
  />
This is a modal!
```
