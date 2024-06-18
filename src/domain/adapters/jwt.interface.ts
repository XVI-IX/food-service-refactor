/**
 * @name IJwtPayload
 * @description This is the payload to be embedded in the token
 * @property id - This is the user's unique ID
 * @property email - This is the user's email
 * @property roles - This is an array of roles the user has
 */
export interface IJwtPayload {
  id: string;
  email?: string;
  roles?: string[];
}

/**
 * @name IJwtService
 * @description This is the interface for the JwtService
 * @method generateToken this generates the jwt
 * @method verifyToken this verifies the authenticity of the token
 */
export interface IJwtService {
  generateToken(payload: IJwtPayload): string;
  verifyToken(token: string): Promise<any>;
  generateResetToken(payload: IJwtPayload): string;
  verifyResetToken(token: string): Promise<any>;
}
