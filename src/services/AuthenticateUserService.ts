/// <reference lib="dom" />
// the above line is needed for the typescript compiler to recognize the global variable "fetch"
type AccessTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}

type UserResponse = {
  login: string;
  id: number;
  name: string;
}

class AuthenticateUserService {
  async run (code: string) {
    const accessTokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })

    const {
      access_token,
      expires_in,
      refresh_token,
      refresh_token_expires_in
    } = await accessTokenResponse.json() as AccessTokenResponse

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${access_token}`
      }
    })

    const { id, name, login } = await userResponse.json() as UserResponse

    return {
      token: {
        access_token,
        expires_in,
        refresh_token,
        refresh_token_expires_in
      },
      user: {
        id,
        name,
        login
      }
    }
  }
}

export { AuthenticateUserService }
