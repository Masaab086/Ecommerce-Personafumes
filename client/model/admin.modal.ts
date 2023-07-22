export interface Admin {
  adminId: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  role?: string;
  gender: string;
  profile?: string;
  address?: string;
  phone?: string;
  day?: number,
  month?: number,
  year?: number,
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
}

export interface AddMemberModal {
  firstName: string;
  lastName: string;
  userEmail: string;
  userPassword: string,
  confirmPassword: string,
  role: string;
  gender: string;
  phone: string;
}

export interface UpdateMemberModal {
  adminId?: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  role: string;
  gender: string;
  phone: string;
}

