import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department?: string;
  lastLogin?: Date;
  mfaEnabled: boolean;
}

export interface AuthResponse {
  token: {
    accessToken: string;
  };
  user: UserProfile;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  departmentId?: string;
}

export interface ActivateAccountData {
  token: string;
  password: string;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordResetConfirmData {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  /**
   * Public signup (Candidates only)
   */
  signup(data: SignupData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data, {
      withCredentials: true
    }).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  /**
   * Create new user (Admin only)
   */
  createUser(data: CreateUserData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  /**
   * Activate account
   */
  activateAccount(data: ActivateAccountData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/activate`, data);
  }

  /**
   * Login
   */
  login(data: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data, {
      withCredentials: true // Ensures cookies are sent/received
    }).pipe(
      tap(response => this.handleAuthResponse(response))
    );
  }

  /**
   * Refresh access token  
   */
  refreshToken(): Observable<{ accessToken: string }> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, {}, {
      withCredentials: true // Refresh token sent via cookie
    }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.accessToken);
        this.decodeAndStoreUser(response.accessToken);
      })
    );
  }

  /**
   * Logout
   */
  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => this.clearAuthData())
    );
  }

  /**
   * Get current user profile
   */
  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem('current_user', JSON.stringify(user));
      })
    );
  }

  /**
   * Request password reset
   */
  requestPasswordReset(data: PasswordResetData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/password-reset/request`, data);
  }

  /**
   * Confirm password reset
   */
  confirmPasswordReset(data: PasswordResetConfirmData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/password-reset/confirm`, data);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    // Check if token is expired
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() < exp;
    } catch {
      return false;
    }
  }

  /**
   * Get access token from localStorage
   */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserSubject.value;
    return user ? roles.includes(user.role) : false;
  }

  /**
   * Get user's department
   */
  getUserDepartment(): string | undefined {
    return this.currentUserSubject.value?.department;
  }

  /**
   * Handle authentication response
   */
  private handleAuthResponse(response: AuthResponse): void {
    // Store access token in localStorage
    localStorage.setItem('access_token', response.token.accessToken);
    
    // Store user data
    this.currentUserSubject.next(response.user);
    localStorage.setItem('current_user', JSON.stringify(response.user));
  }

  /**
   * Decode JWT and store user
   */
  private decodeAndStoreUser(token: string): void {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Note: Full user data should be fetched from /me endpoint
      // This is just a fallback
      const user: Partial<UserProfile> = {
        id: payload.sub,
        email: payload.email,
        role: payload.role
      };
      
      // Fetch full profile
      this.getCurrentUser().subscribe();
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  }

  /**
   * Load user from localStorage on init
   */
  private loadUserFromStorage(): void {
    const token = this.getAccessToken();
    const userStr = localStorage.getItem('current_user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        
        // Verify token is still valid
        if (this.isAuthenticated()) {
          this.currentUserSubject.next(user);
          
          // Refresh user data from server
          this.getCurrentUser().subscribe({
            error: () => this.clearAuthData()
          });
        } else {
          this.clearAuthData();
        }
      } catch {
        this.clearAuthData();
      }
    }
  }

  /**
   * Clear authentication data
   */
  private clearAuthData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }
}
