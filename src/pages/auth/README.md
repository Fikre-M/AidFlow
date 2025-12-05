# Authentication UI Documentation

## Overview
Complete authentication system with Login, Register, and Forgot Password pages.

## Features

### Login Page (`/login`)
- Email and password validation
- Remember me checkbox
- Social login buttons (Google, Microsoft)
- Demo credentials display
- Forgot password link
- Sign up link
- Mock authentication with demo credentials

**Demo Credentials:**
- Email: `demo@example.com`
- Password: `password`

### Register Page (`/register`)
- Full name, email, password, and confirm password fields
- Real-time password strength indicator
- Terms and conditions checkbox
- Social sign up options
- Form validation with error messages
- Password matching validation

### Forgot Password Page (`/forgot-password`)
- Email input for password reset
- Success state with instructions
- Resend email functionality
- Back to login link
- Support contact link

## Components Used

### AuthInput (`src/components/forms/AuthInput.jsx`)
Reusable input component with:
- Label support
- Icon support
- Error message display
- Required field indicator
- Focus states
- Validation styling

### Button (`src/components/common/Button.jsx`)
Enhanced button with:
- Multiple variants (primary, secondary, danger)
- Disabled state
- Loading state support
- Focus ring

### Alert (`src/components/common/Alert.jsx`)
Alert component for:
- Success messages
- Error messages
- Warning messages
- Info messages
- Dismissible alerts

## Validation

All forms use validators from `src/utils/validators.js`:
- `validateEmail()` - Email format validation
- `validatePassword()` - Minimum 8 characters
- `validateRequired()` - Required field check

## Mock Handlers

All forms currently use mock handlers with setTimeout to simulate API calls:
- Login: Validates against demo credentials
- Register: Simulates account creation
- Forgot Password: Simulates email sending

## Styling

- TailwindCSS for all styling
- Responsive design (mobile-first)
- Gradient background with animated elements
- Smooth transitions and hover effects
- Focus states for accessibility

## Usage

```jsx
import { BrowserRouter } from 'react-router-dom'
import AuthRoutes from './routes/AuthRoutes'

function App() {
  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  )
}
```

## Next Steps

To integrate with a real backend:
1. Replace mock handlers with actual API calls
2. Update `src/services/authService.js`
3. Implement token storage (localStorage/cookies)
4. Add protected route logic
5. Connect to AuthContext for global state
