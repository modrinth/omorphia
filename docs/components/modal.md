# Modal
:::raw

<DemoContainer>
  <Button :action="() => this.$refs.reportModal.modal.show()">Show Modal</Button>
  <ModalReport
  ref="reportModal"
  itemType="project"
  :reportTypes="['cringitude', 'rudeness', 'notgamer', 'windowsuser']"
  >
  </ModalReport>
  <Button :action="() => this.$refs.confirmModal.modal.show()">Show Confirm Modal</Button>
  <ModalConfirm
    ref="confirmModal"
    title="Are you sure you want to delete this version?"
    description="This will remove this version forever (like really forever)."
    :has-to-type="false"
    proceed-label="Delete"
  >
  </ModalConfirm>
</DemoContainer>
:::

```vue
  <Button :action="() => this.$refs.reportModal.modal.show()">Show Modal</Button>
  <ModalReport
  ref="reportModal"
  itemType="project"
  :reportTypes="['cringitude', 'rudeness', 'notgamer', 'windowsuser']"
  />
```
