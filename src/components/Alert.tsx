import { Alert } from "@mantine/core";

type CustomAlertProps = {
  message: string;
  onClose: () => void;
};

export default function CustomAlert({ message, onClose }: CustomAlertProps) {
  return (
    <Alert title="Alert" onClose={onClose} withCloseButton>
      {message}
    </Alert>
  );
}
