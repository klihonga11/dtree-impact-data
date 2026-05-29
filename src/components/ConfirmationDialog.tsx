import { Button, Group, Modal, Space } from "@mantine/core";

type ConfirmationDialogProps = {
    title: string,
    text: string,
    opened: boolean,
    close: () => void,
    onClickYes: () => void
}

export default function ConfirmationDialog({title, text, opened, close, onClickYes}: ConfirmationDialogProps) {
    return(
        <Modal opened={opened} onClose={close} title={title} withinPortal={false}>
            {text}
            <Space h="lg"/>
            <Group>
                <Button onClick={onClickYes}>Yes</Button>
                <Button color="gray" onClick={close}>No</Button>
            </Group>
        </Modal>
    )
}