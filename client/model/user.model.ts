export interface MainUser {
  firstName: string;
  lastName: string;
  gender: string;
  profile?: string;
  shippingAddress?: string;
  day?: number,
  month?: number,
  year?: number,
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
}

export interface UserUpdate extends MainUser {
  phone: string,
  userEmail: string;
}
export interface User extends MainUser {
  phone: string,
  userEmail: string;
  customerId: string;
  balance: string;
  joiningDate: Date;
}

export interface GuestUser {
  guestEmail: string;
  shippingAddress: string;
  state: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}