/**
 * Exports all common components/hooks
 */

export { default as AddressForm } from "./forms/AddressForm";
export { default as EmergencyContactForm } from "./forms/EmergencyContactForm";
export { default as FileUpload } from "./forms/FileUpload";
export { default as PhoneInput } from "./forms/PhoneInput";
export { default as TextInput } from "./forms/TextInput";
export { default as MaskedTextInput } from "./forms/MaskedTextInput";
export { default as EmailForm } from "./forms/EmailForm";
export { default as PhoneForm } from "./forms/PhoneForm";
export { default as PasswordResetForm } from "./forms/PasswordResetForm";
export { default as ChangePasswordForm } from "./forms/ChangePasswordForm";
export { default as ReferralForm } from "./forms/ReferralForm";
export { default as PasswordStrength } from "./forms/PasswordStrength";
export { default as NewThreadForm } from "./forms/NewThreadForm";
export { default as ExternalProviderForm } from "./forms/ExternalProviderForm";
export { AuthProvider, useAuth } from "./context/auth";
export { default as ProtectedView } from "./hoc/ProtectedView";

export { default as ChatWindow } from "./messaging/ChatWindow";
export { default as ThreadList } from "./messaging/ThreadList";
export { default as Message } from "./messaging/Message";
export { default as MessageThread } from "./messaging/MessageThread";
export { default as ProfilePicture } from "./messaging/ProfilePicture";

export { useKeyPress } from "./hooks/key";
export { useSpeechRecognition } from "./hooks/speech_recognition";
export * from "./components";
