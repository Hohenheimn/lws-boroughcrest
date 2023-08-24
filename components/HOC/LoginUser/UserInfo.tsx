export type LoginUserInfo = {
  id: number;
  portal_id: number;
  employee_id: number;
  name: string;
  email: string;
  email_verified_at: string;
  remember_token: string;
  role_id: string;
  corporate_id: number;
  department_id: number;
  contact_no: number;
  position: string;
  image_photo: string;
  image_signature: string;
  status: string;
  created_at: string;
  updated_at: string;
  corporate_gst_type: string;
  permissions: PermissionsUserLogin[];
  system_admin: any;
  corporate_admin: any;
};
export type PermissionsUserLogin = {
  access: string[];
  duration: number;
  expiration_date: string;
  menu: string;
};
