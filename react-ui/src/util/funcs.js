export function getEmailError (email) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { message: 'Invalid email address.' }
  }
}

export function getPasswordError (password) {
  if (password.length < 6) {
    return { message: 'Password must be at least 6 characters long.' }
  }
}
