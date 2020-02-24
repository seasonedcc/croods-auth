import { ActionOptions } from 'croods/dist/types/typeDeclarations'
import { Inputs } from 'react-use-form-state'

export interface Headers {
  accessToken?: string
  client?: string
  expiry?: string
  tokenType?: string
  uid?: string
}

export interface ParsedHeaders {
  'Access-Token'?: string
  Client?: string
  Expiry?: string
  'Token-Type'?: string
  Uid?: string
}

export interface HeadersOptions extends ActionOptions {
  storage?: {
    setItem(a: string, b: string): void
    getItem(a: string): string
    removeItem(a: string): void
  }
  storageKey?: string
}

export interface FormState {
  touched: any
  values: any
  errors: any
  setFieldError?: Function
}

export interface SignOutState {
  signingOut: boolean
  error?: string | null
}

export interface DeleteAccountState {
  deleting: boolean
  error?: string | null
}

export interface CurrentUserState {
  currentUser: any
  validating: boolean
}

export interface AuthFormState {
  fields: Inputs<any, string | number | symbol>
  formProps: { onSubmit: (e: Event) => Promise<void> | undefined }
  fieldProps: any
  fieldError: (t: string) => string | undefined
  formState: FormState
  isFormValid: boolean
  error?: string | null
}

export interface SignInState extends AuthFormState {
  emailProps: any
  passwordProps: any
  signingIn: boolean
}

export interface SignUpState extends AuthFormState {
  emailProps: any
  passwordProps: any
  passwordConfirmationProps: any
  signingUp: boolean
}

export interface ResetPassState extends AuthFormState {
  passwordProps: any
  passwordConfirmationProps: any
  reseting: boolean
}

export interface EditProfileState extends AuthFormState {
  currentUser: any
  saving: boolean
}

export interface ForgotPassState extends AuthFormState {
  emailProps: any
  sending: boolean
}

export interface SignInProviderState {
  signingIn: boolean,
  error?: string | null
}
