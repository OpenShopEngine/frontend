export class LoginResponse<T> {
  success: boolean;
  data: T;
  error: string;
}
