# Modal
:::raw

<DemoContainer>
  <Button :action="() => this.$refs.confirmModal.show()">Show Confirm Modal</Button>
  <ConfirmModal
    ref="confirmModal"
    title="Are you sure you want to delete this version?"
    description="This will remove this version forever (like really forever)."
    :has-to-type="true"
    proceed-label="Delete"
    confirmationText="Hello"
  >
  </ConfirmModal>
</DemoContainer>
:::

```vue
<Button :action="() => this.$refs.confirmModal.show()">Show Confirm Modal</Button>
<ConfirmModal
  ref="confirmModal"
  title="Are you sure you want to delete this version?"
  description="This will remove this version forever (like really forever)."
  :has-to-type="true"
  proceed-label="Delete"
  confirmationText="Hello"
>
</ConfirmModal>
```
