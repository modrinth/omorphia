# Card
:::raw

<DemoContainer>
  <Button :action="() => this.$refs.reportModal.modal.show()">Show Modal</Button>
  <ModalReport
  ref="reportModal"
  itemType="project"
  :reportTypes="['cringitude', 'rudeness', 'notgamer', 'windowsuser']"
  >
  </ModalReport>
</DemoContainer>
:::

```vue
  <ModalReport
  ref="reportModal"
  itemType="project"
  :reportTypes="['cringitude', 'rudeness', 'notgamer', 'windowsuser']"
  >
This is a modal!
```
