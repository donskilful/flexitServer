interface ValidationMessage {
  msg: string;
}

type ValidationMessageItems = Array<ValidationMessage>;

const formatValidationMessages = (
  messageArray: ValidationMessageItems,
): string[] => messageArray.map((message) => message.msg);

export default formatValidationMessages;
