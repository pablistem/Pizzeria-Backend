export enum ValidationErrorMessagesEnum {
  USERNAME_INVALID_ERROR = 'the username should not contain any special character except: "-" or "_"',
  NAME_INVALID_ERROR = 'the name should not contain any number or special character',
  LASTNAME_INVALID_ERROR = 'the last name should not contain any number or special character',
  AGE_INVALID_ERROR = 'the age should be only a number',
  PHONE_INVALID_ERROR = 'the age should be only a number',
}

export enum EmptyFieldErrorMessagesEnum {
  USERNAME_EMPTY_ERROR = 'username should not be empty',
  NAME_EMPTY_ERROR = 'name should not be empty',
  LASTNAME_EMPTY_ERROR = 'last name should not be empty',
  AGE_EMPTY_ERROR = 'age should not be empty',
  PHONE_EMPTY_ERROR = 'phone should not be empty'
}